import Link from 'next/link'

export default function Upnav() {
  return (
    <>
      <div className='flex flex-wrap md:flex-nowrap w-full gap-10 p-2 bg-white shadow-md border-b-2 border-lightGray justify-end md:justify-end md:pl-5 md:pt-2 font-sans md:shadow-lg sticky'>
        <Link href="/" className='block py-1 text-gray-700 md:text-left font-sans text-sm'>Return</Link>
        <Link href="/" className='block py-1 text-gray-700 md:text-left font-sans text-sm'>Help</Link>
        <Link href="/" className='block py-1 text-gray-700 md:text-left pr-14 font-sans text-sm'>Register / Sign In</Link>
      </div>
    </>
  )
}

