import CheckoutProduct from '@/components/CheckoutProduct'
import useWindowDimensions from '@/hooks/useWindowsDimensions'
import { selectItems, selectTotal } from '@/slices/basketSlice'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import useScrollPosition from '@/hooks/useScrollPosition'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
const stripePromisse = loadStripe(`${process.env.stripe_public_key}`)

type CheckoutProps = {
  width: number
  height: number
}

interface ProductsProps {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  hasPrime: boolean
  ratings: number
}

const Checkout: FC<CheckoutProps> = ({}) => {
  const [hasMounted, setHasMounted] = useState(false) // <-- add this
  const { data: session } = useSession()

  const { width }: CheckoutProps = useWindowDimensions()
  const scrollPosition: number | undefined = useScrollPosition()

  const items = useSelector(selectItems)
  const total = useSelector(selectTotal)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const createCheckoutSessions = async () => {
    const stripe = await stripePromisse

    const checkoutSession = await axios.post('/api/create-checkout-session', {
      items,
      email: session?.user?.email,
    })
    console.log('checkoutSession: ', checkoutSession)

    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    })

    if (result?.error) {
      alert(result.error.message)
    }
  }

  return (
    <div className="bg-gray-100 h-[100%]">
      <main className="lg:flex max-w-screen-3x1 mx-auto justify-center">
        <div className="flex-grow m-5 shadow-5 md:max-w-[75%] bg-black">
          <Image
            alt="checkout banner"
            src="https://links.papareact.com/ikj"
            width={width >= 1025 ? width * 0.7 : width}
            height={250}
          />
          <div className="flex flex-col mt-2 p-5 space-y-10 bg-white">
            <h1 className="text-3x1 border-b pb-4">
              {items.length === 0
                ? 'Your Amazon Basket is empty'
                : 'Shopping Basket'}
            </h1>
            {items.map((item: ProductsProps, _) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
                ratings={item.ratings}
              />
            ))}
          </div>
        </div>

        <div className="relative lg:min-w-[220px]" />
        {items.length > 0 && (
          <div
            className={`flex flex-col p-10 bg-white mt-5 shadow-md md:min-w-[15%] max-h-[40vh] md:fixed md:right-6 lg:right-6 ${
              scrollPosition !== undefined && scrollPosition >= 100 && 'top-3'
            }`}
          >
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{' '}
              </h2>
              <span className="font-bold">
                <CurrencyFormat
                  value={total.toFixed(2)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'R$'}
                />
              </span>
              <button
                role="link"
                onClick={createCheckoutSessions}
                className={`button mt-2 ${
                  !session &&
                  'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
              >
                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
              </button>
            </>
          </div>
        )}
      </main>
    </div>
  )
}

export default Checkout
