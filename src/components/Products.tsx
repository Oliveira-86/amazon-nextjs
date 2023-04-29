import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/solid'
import CurrencyFormat from 'react-currency-format'

interface ProductsProps {
  id: string
  title: string
  price: number
  description: string
  category: string
  image: string
}

const MAX_RATINGS: number = 5
const MIN_RATINGS: number = 1

const Products: FC<ProductsProps> = ({
  id,
  title,
  price,
  description,
  category,
  image,
}) => {
  const [ratings] = useState(
    Math.floor(Math.random() * (MAX_RATINGS - MIN_RATINGS + 1)) + MIN_RATINGS
  )
  const [hasPrime] = useState(Math.random() < 0.5)

  const [hasMounted, setHasMounted] = useState(false) // <-- add this

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <div className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </div>
      <Image
        src={image}
        height={200}
        width={200}
        object-fit="contain"
        alt={title}
        className="self-center"
      />
      <div className="my-3">{title}</div>

      {hasMounted && (
        <div className="flex">
          {Array(ratings)
            .fill(0)
            .map((_, index) => (
              <>
                <StarIcon className="h-5 text-yellow-500" />
              </>
            ))}
        </div>
      )}

      <p className="text-sm my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <CurrencyFormat
          value={price}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'R$'}
        />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button className=" button">Add basket</button>
    </div>
  )
}

export default Products
