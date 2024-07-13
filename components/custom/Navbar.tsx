import Link from 'next/link';
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { BsBell } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between p-4 bg-white shadow-md border-b border-lightGray'>
      <div className='flex items-center space-x-6'>
        <CiSearch className='text-gray-600 text-2xl' />
        <Link href={'/'} className='text-gray-700 hover:text-blue-500 transition duration-300'>SHOP</Link>
        <Link href={'/'} className='text-gray-700 hover:text-blue-500 transition duration-300'>ESSENTIALS</Link>
      </div>
      
      <div className='flex flex-grow justify-center'>
        <Link href={'/'} className='font-monotype-corsiva text-2xl italic transition duration-300 hover:text-blue-500'>
          Macc Essentials
        </Link>
      </div>
      
      <div className='flex items-center space-x-6'>
        <Link href={'/'} className='text-gray-700 hover:text-blue-500 transition duration-300'>ABOUT US</Link>
        <Link href={'/'} className='text-gray-700 hover:text-blue-500 transition duration-300'>BEST SELLERS</Link>
        <CgProfile className='text-gray-700 text-xl hover:text-blue-500 transition duration-300' />
        <BsBell className='text-gray-700 text-xl hover:text-blue-500 transition duration-300' />
        <CiShoppingCart className='text-gray-700 text-xl hover:text-blue-500 transition duration-300' />
      </div>
    </nav>
  );
}
