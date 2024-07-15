"use client";
import { useState, useEffect, useCallback } from "react";
import Link from 'next/link';
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { CgMenuRight, CgUser } from "react-icons/cg";
import { BsBell } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { selectCartItemsCount } from '@/redux/cartslice';

export default function Navbar() {
  const [show, setShow] = useState(false);
  const cartItemCount = useSelector((state: RootState) => selectCartItemsCount(state));

  const updateWidth = useCallback(() => {
    setShow(window.innerWidth >= 400 && window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth(); // Initial check
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  return (
    <nav className='flex items-center justify-between p-6 md:p-10 bg-white shadow-md border-b border-lightGray sticky top-0 z-50'>
      <div className='flex items-center space-x-4 md:space-x-6'>
        <CiSearch className='text-gray-600 text-2xl' />
      </div>

      <div className={`text-gray-700 text-2xl md:text-xl hover:text-blue-500 transition duration-300 ${show ? "block" : "hidden"}`}>
        <CgMenuRight />
      </div>

      <div className='flex-grow flex justify-center items-center space-x-8 md:space-x-20 ml-4 md:ml-10'>
        <Link href='/products' className='text-gray-700 hover:text-blue-500 transition duration-300'>SHOP</Link>
        <Link href='/products' className='text-gray-700 hover:text-blue-500 transition duration-300'>ESSENTIALS</Link>
        <div className='flex flex-col items-center'>
          <Link href='/products' className='font-monotype-corsiva text-xl md:text-2xl italic transition duration-300 text-red-600'>
            Macc
          </Link>
          <Link href='/products' className='font-monotype-corsiva text-xl md:text-2xl italic transition duration-300 text-blue-800'>
            Essentials
          </Link>
        </div>
        <Link href='/' className='text-gray-700 hover:text-blue-500 transition duration-300'>ABOUT US</Link>
        <Link href='/products' className='text-gray-700 hover:text-blue-500 transition duration-300'>BEST SELLERS</Link>
      </div>
      
      <div className='flex items-center space-x-4 md:space-x-10'>
        <CgUser className='text-gray-700 text-2xl md:text-xl hover:text-blue-500 transition duration-300'/>
        <div className='relative'>
          <BsBell className='text-gray-700 text-2xl md:text-xl hover:text-blue-500 transition duration-300'/>
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-600 rounded-full">
              {cartItemCount}
            </span>
          )}
        </div>
        <CiShoppingCart className='text-gray-700 text-2xl md:text-xl hover:text-blue-500 transition duration-300' />
      </div>
    </nav>
  );
}
