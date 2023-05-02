import Image from 'next/image'
import { FC } from 'react'
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectItems } from '@/slices/basketSlice'

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const items = useSelector(selectItems)

  return (
    <header>
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div
          onClick={() => router.push('/')}
          className="mt-2 flex items-center flex-grow sm:flex-grow-0 mx-4"
        >
          <Image
            alt="logo"
            src="https://links.papareact.com/f90"
            width={110}
            height={35}
            object-fit="contain"
            className="cursor-pointer"
          />
        </div>
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        <div className="text-white flex items-center text-xs space-x-6 mx-4 whitespace-nowrap">
          <div
            onClick={() =>
              status === 'authenticated' ? signOut() : signIn('google')
            }
            className="link"
          >
            <p className="">
              {status === 'authenticated'
                ? `Hello, ${session?.user?.name}`
                : 'Sign In'}
            </p>
            <p className="font-extrabold md:text-sm">Accountn & Lists</p>
          </div>

          <div className="link">
            <p className="">Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div
            onClick={() => router.push('/checkout')}
            className="link flex items-center justif"
          >
            <span className="absolute top-3 right-3 md:right-14 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-semibold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="flex link items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today&apos;s Deals</p>
        <p className="link hidden lg:inline-flex">Eletronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  )
}

export default Header
