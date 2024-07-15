"use client";
import {useState, useEffect} from "react";
import Link from 'next/link';
import { CiSearch } from "react-icons/ci";
import { CgMenuRight, CgUser } from "react-icons/cg";
import { BsBell } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";

export default function Navbar() {
  const [show, setShow] = useState(false);

  const updateWidth = () => {
    if (window.innerWidth >= 400 && window.innerWidth <= 768) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);


  return (
    <nav className='flex items-center justify-between p-6 md:p-10 bg-white shadow-md border-b border-lightGray sticky top-0 z-50'>
      <div className='flex items-center space-x-4 md:space-x-6'>
        <CiSearch className='text-gray-600 text-2xl' />
      </div>

      <CgMenuRight 
        style={{ display: show ? "block" : "none" }}
        className="text-gray-700 text-2xl md:text-xl hover:text-blue-500 transition duration-300"
      />
      
      <div className='flex-grow flex justify-center items-center space-x-8 md:space-x-20 ml-4 md:ml-10'>
        <Link href='/' className='text-gray-700 hover:text-blue-500 transition duration-300'>SHOP</Link>
        <Link href='/' className='text-gray-700 hover:text-blue-500 transition duration-300'>ESSENTIALS</Link>
        <div className='flex flex-col items-center'>
          <Link href='/' className='font-monotype-corsiva text-xl md:text-2xl italic transition duration-300 text-red-600'>
            Macc
          </Link>
          <Link href='/' className='font-monotype-corsiva text-xl md:text-2xl italic transition duration-300 text-blue-800'>
            Essentials
          </Link>
        </div>
        <Link href='/' className='text-gray-700 hover:text-blue-500 transition duration-300'>ABOUT US</Link>
        <Link href='/' className='text-gray-700 hover:text-blue-500 transition duration-300'>BEST SELLERS</Link>
      </div>
      
      <div className='flex items-center space-x-4 md:space-x-10'>
        <CgUser className='text-gray-700 text-2xl md:text-xl hover:text-blue-500 transition duration-300'/>
        <BsBell className='text-gray-700 text-2xl md:text-xl hover:text-blue-500 transition duration-300' />
        <CiShoppingCart className='text-gray-700 text-2xl md:text-xl hover:text-blue-500 transition duration-300' />
      </div>
    </nav>
  );
}
