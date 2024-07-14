import Link from 'next/link';
import { CiSearch } from "react-icons/ci";
import { CgProfile, CgUser } from "react-icons/cg";
import { BsBell } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between p-10 bg-white shadow-md border-b border-lightGray sticky'>
      <div className='flex items-center space-x-6'>
        <CiSearch className='text-gray-600 text-2xl' />
        {/* <Link href={'/'} className='text-gray-700 hover:text-blue-500 transition duration-300'>SHOP</Link>
        <Link href={'/'} className='text-gray-700 hover:text-blue-500 transition duration-300'>ESSENTIALS</Link> */}
      </div>
      
      <div className='flex flex-grow justify-center items-center space-x-20 ml-10'>
        <Link href={'/'} className='text-gray-700 hover:text-blue-500 transition duration-300'>SHOP</Link>
        <Link href={'/'} className='text-gray-700 hover:text-blue-500 transition duration-300'>ESSENTIALS</Link>
        <div className='flex flex-col items-center'>
          <Link href={'/'} className='font-monotype-corsiva text-2xl italic transition duration-300 text-red-600'>
            Macc
          </Link>
          <Link href={'/'} className='font-monotype-corsiva text-2xl italic transition duration-300 text-blue-800'>
            Essentials
          </Link>
        </div>
        <Link href={'/'} className='text-gray-700 hover:text-blue-500 transition duration-300'>ABOUT US</Link>
        <Link href={'/'} className='text-gray-700 hover:text-blue-500 transition duration-300'>BEST SELLERS</Link>
      </div>
      
      <div className='flex items-center space-x-10'>
        {/* <Link href={'/'} className='text-gray-700 hover:text-blue-500 transition duration-300'>ABOUT US</Link>
        <Link href={'/'} className='text-gray-700 hover:text-blue-500 transition duration-300'>BEST SELLERS</Link> */}
        <CgUser className='size-6 text-gray-700 text-xl hover:text-blue-500 transition duration-300'/>
        <BsBell className='size-6 text-gray-700 text-xl hover:text-blue-500 transition duration-300' />
        <CiShoppingCart className='size-6 text-gray-700 text-xl hover:text-blue-500 transition duration-300' />
      </div>
    </nav>
  );
}
