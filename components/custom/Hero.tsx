import Image from 'next/image';
import { Button } from '@/components/ui/button';
import heroImage from '../../public/images/hero-image.png';

export default function Hero() {
  return (
    <div className='flex flex-col md:flex-row-reverse items-center justify-between h-screen bg-gradient-to-r from-gray-100 to-white text-black px-6 md:px-10'>
      <div className='flex-1 flex items-center justify-center p-4'>
        <Image 
          // src='https://media.istockphoto.com/id/1887444772/photo/three-diverse-professional-women-in-business-attire-smiling-and-posing-in-an-office.webp?b=1&s=170667a&w=0&k=20&c=Qw3xzprj3QLKjiWJEejZI1Py6eohrsSKaX3a6fy3HrI=' 
          src={heroImage}
          alt='Professional Women' 
          width={600} 
          height={400} 
          className='object-cover rounded-lg'
        />
      </div>
      
      <div className='flex-1 flex flex-col items-center md:items-start justify-center p-8 text-center md:text-left'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4 text-blue-900 leading-relaxed'>
          PROVIDING SERVICES AT YOUR DOOR
        </h1>
        <p className='text-lg mb-6'>
          <b>MACC Essentials</b> has an important role in making supplies and services available to customers and their patients during this critical time. This includes services from various domains. Our aim is to aid you as much as we can.
        </p>
        <Button className='bg-red-600 text-white font-bold py-2 px-8 mt-8'>
          LEARN MORE
        </Button>
      </div>
    </div>
  );
}
