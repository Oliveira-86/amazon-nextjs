import Head from 'next/head'
import Header from '@/components/Header'
import Banner from '@/components/Banner'
import ProductFeed from '@/components/ProductFeed'

interface HomeProps {
  products: []
}

export default function Home({ products }: HomeProps) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const products = await fetch('https://fakestoreapi.com/products').then(
    (response) => response.json()
  )

  return {
    props: {
      products,
    },
  }
}
