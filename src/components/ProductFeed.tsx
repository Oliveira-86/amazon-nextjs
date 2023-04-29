import { FC, useState } from 'react'
import Products from './Products'

interface ProductItemProps {
  id: string
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
    <div>
      {products.map(({ id, title, price, description, category, image }) => (
        <Products
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
