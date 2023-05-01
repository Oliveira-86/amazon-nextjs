import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { FC } from 'react'
import CurrencyFormat from 'react-currency-format'

interface CheckoutProductProps {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  hasPrime: boolean
  ratings: number
}

const CheckoutProduct: FC<CheckoutProductProps> = ({
  id,
  title,
  price,
  description,
  category,
  image,
  hasPrime,
  ratings,
}) => {
  return (
    <div className="grid grid-cols-5">
      <Image alt="title" src={image} width={150} height={150} />

      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(ratings)
            .fill(0)
            .map((_, index) => (
              <StarIcon key={index} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <CurrencyFormat
          value={price}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'R$'}
        />
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt="prime"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 my-auto justify-self-end">
        <button className="button">add to basket</button>
        <button className="button">remove from basket</button>
      </div>
    </div>
  )
}

export default CheckoutProduct
