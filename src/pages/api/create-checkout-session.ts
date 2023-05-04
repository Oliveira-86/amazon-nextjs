const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req: any, res: any) => {
  console.log('checkout session')
  const { items, email } = req.body

  const transformedItems = items?.map((item: any) => ({
    quantity: 1,
    price_data: {
      currency: 'brl',
      unit_amount: item.price * 100,
      product_data: {
        description: item.description,
        name: item.title,
        images: [item.image],
      },
    },
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['US', 'BR', 'CA'],
    },
    line_items: transformedItems,
    mode: 'payment',
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/checkout`,
  })

  res.status(200).json({ id: session.id })
}
