import Link from 'next/link'

export default function Upnav() {
  return (
    <>
      <div className='flex flex-wrap md:flex-nowrap w-full gap-10 p-2 shadow-md border-b-2 border-lightGray justify-end md:justify-end md:pl-5 md:pt-2 font-sans md:shadow-lg'>
        <Link href="/" className='block py-1 text-center md:text-left'>Return</Link>
        <Link href="/" className='block py-1 text-center md:text-left'>Help</Link>
        <Link href="/" className='block py-1 text-center md:text-left pr-14'>Login / Signup</Link>
      </div>
    </>
  )
}
