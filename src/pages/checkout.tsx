import CheckoutProduct from '@/components/CheckoutProduct'
import useWindowDimensions from '@/hooks/useWindowsDimensions'
import { selectItems } from '@/slices/basketSlice'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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

  const { width, height }: CheckoutProps = useWindowDimensions()

  const items = useSelector(selectItems)

  console.log('width: ', width)

  useEffect(() => {
    setHasMounted(true)
  }, [])
  console.log(items)
  return (
    <div className="bg-gray-100">
      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-5">
          <Image
            alt="checkout banner"
            src="https://links.papareact.com/ikj"
            width={width >= 1025 ? width * 0.7 : width}
            height={250}
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
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

        <div>side</div>
      </main>
    </div>
  )
}

export default Checkout
