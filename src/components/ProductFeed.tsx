import { FC, useState } from 'react'
import Products from './Products'
import Image from 'next/image'

interface ProductItemProps {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

interface ProductFeedProps {
  products: ProductItemProps[]
}

const ProductFeed: FC<ProductFeedProps> = ({ products }) => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products
        .slice(0, 4)
        .map(({ id, title, price, description, category, image }) => (
          <Products
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}

      <div className="ml-4 md:col-span-full">
        <Image
          width={1500}
          height={500}
          src="https://links.papareact.com/dyz"
          alt="middle_banner"
        />
      </div>

      <div className="md:col-span-full">
        {products
          .slice(4, 5)
          .map(({ id, title, price, description, category, image }) => (
            <Products
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          ))}
      </div>
      {products
        .slice(5, products.length)
        .map(({ id, title, price, description, category, image }) => (
          <Products
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}
    </div>
  )
}

export default ProductFeed
