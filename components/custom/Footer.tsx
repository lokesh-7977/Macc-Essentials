import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaFacebookF, FaTwitter, FaLinkedinIn , FaInstagramSquare } from 'react-icons/fa';
import { CgMail } from 'react-icons/cg';

export default function Footer() {
  return (
    <footer className='bg-white text-black py-10 px-4'>
      <div className='container mx-auto flex md:flex-row justify-between items-start md:items-start gap-40'>
        
        {/* Logo/Company Name */}
        {/* <div className='flex flex-col items-start mb-6 md:mb-0 pl-5'>
          <h1 className='text-3xl font-bold'>Macc Essentials</h1>
        </div> */}
        <div className='flex flex-col items-start'>
          <Link href={'/'} className='font-monotype-corsiva text-2xl leading-relaxed italic transition duration-300 text-red-600'>
            Macc
          </Link>
          <Link href={'/'} className='font-monotype-corsiva text-2xl italic transition duration-300 text-blue-800'>
            Essentials
          </Link>
        </div>
        
        {/* Navigation Links */}
        <div className='grid grid-cols-2 grid-rows-3 gap-x-36 gap-y-2'>
            <Link href='/' className='text-lg hover:text-gray-400 mb-2'>Home</Link>
            <Link href='/about' className='text-lg hover:text-gray-400 mb-2'>About</Link>
            <Link href='/collection' className='text-lg hover:text-gray-400 mb-2'>Collection</Link>
            <Link href='/contact' className='text-lg hover:text-gray-400 mb-2'>Contact</Link>
            <Link href='/products' className='text-lg hover:text-gray-400 mb-2'>Products</Link>
            <Link href='/faq' className='text-lg hover:text-gray-400'>FAQ</Link>
        </div>
        
        {/* Subscription Form */}
        <div className='flex flex-col items-start mb-6 md:mb-0 gap-y-6'>
          <p className='text-lg mb-4'>
            Be the first to know about our biggest and best sales. We'll never send more than one email a month.
          </p>
          <form className='flex'>
            <input 
              type='email' 
              placeholder='ENTER YOUR EMAIL' 
              className='p-2 placeholder-black underline underline-offset-8'
            />
            <CgMail className='size-10 text-gray-700 text-xl active:text-blue-500 transition duration-300'/>
          </form>
          <div className='flex space-x-4'>
          <Link href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
            <FaFacebookF className='text-2xl hover:text-gray-400 text-white bg-blue-900 rounded-2xl size-7 p-1.5' />
          </Link>
          <Link href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
            <FaTwitter className='text-2xl hover:text-gray-400  text-white bg-blue-900 rounded-2xl size-7 p-1.5' />
          </Link>
          <Link href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
            <FaLinkedinIn className='text-2xl hover:text-gray-400  text-white bg-blue-900 rounded-2xl size-7 p-1.5' />
          </Link>
          <Link href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
            <FaInstagramSquare className='text-2xl hover:text-gray-400  text-white bg-blue-900 rounded-2xl size-7 p-1.5' />
          </Link>
          </div>

        </div>
      </div>
      <p className='text-center pt-11'>All rights are reserved</p>
    </footer>
  );
}
