import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaFacebookF, FaTwitter, FaLinkedinIn , FaInstagramSquare } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='bg-gray-900 text-white py-10 px-4'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center'>
        
        {/* Logo/Company Name */}
        <div className='flex flex-col items-start mb-6 md:mb-0'>
          <h1 className='text-3xl font-bold'>Macc Essentials</h1>
        </div>
        
        {/* Navigation Links */}
        <div className='flex flex-col md:flex-row mb-6 md:mb-0'>
          <div className='flex flex-col md:mr-12'>
            <Link href='/' className='text-lg hover:text-gray-400 mb-2'>Home</Link>
            <Link href='/about' className='text-lg hover:text-gray-400 mb-2'>About</Link>
            <Link href='/collection' className='text-lg hover:text-gray-400 mb-2'>Collection</Link>
            <Link href='/contact' className='text-lg hover:text-gray-400 mb-2'>Contact</Link>
            <Link href='/products' className='text-lg hover:text-gray-400 mb-2'>Products</Link>
            <Link href='/faq' className='text-lg hover:text-gray-400'>FAQ</Link>
          </div>
        </div>
        
        {/* Subscription Form */}
        <div className='flex flex-col items-start mb-6 md:mb-0'>
          <p className='text-lg mb-4'>
            Be the first to know about our biggest and best sales. We'll never send more than one email a month.
          </p>
          <form className='flex'>
            <input 
              type='email' 
              placeholder='ENTER YOUR EMAIL' 
              className='p-2 rounded-l-md border border-gray-700 bg-gray-800 text-white placeholder-gray-400'
            />
            <Button 
              type='submit' 
              className='bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-md'
            >
              Subscribe
            </Button>
          </form>
        </div>

        <div className='flex space-x-4'>
          <Link href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
            <FaFacebookF className='text-2xl hover:text-gray-400' />
          </Link>
          <Link href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
            <FaTwitter className='text-2xl hover:text-gray-400' />
          </Link>
          <Link href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
            <FaLinkedinIn className='text-2xl hover:text-gray-400' />
          </Link>
          <Link href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
            <FaInstagramSquare className='text-2xl hover:text-gray-400' />
          </Link>
        </div>
      </div>
    </footer>
  );
}
