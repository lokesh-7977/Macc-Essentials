"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '@/app/(home)/newproducts/card';
import { Button} from '@/components/ui/button';
import Image from 'next/image';
import topImg from '../../../public/images/top-sellings.png';

interface Product {
  id: string;
  image: string;
}

export default function Page() {
  const [cards, setCards] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://real-time-amazon-data.p.rapidapi.com/seller-products?seller_id=A02211013Q5HP3OMSZC7W&country=US&page=1', {
          headers: {
            'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
            'x-rapidapi-key': 'd7b0ceb475msh769a5ad34fda6e5p1923fcjsnd752266e88a3'
            // 'x-rapidapi-key': 'd8e882a5bcmsh0c5c82cfa9ef49ep1b48d7jsn66bb991bb5cd'
          }
        });

        const sellerProducts = response.data?.data?.seller_products;

        if (sellerProducts) {
          const fetchedCards = sellerProducts.map((product: any) => ({
            id: product.asin,
            image: product.product_photo,
          }));

          setCards(fetchedCards.slice(0, 2)); // Only keep the first 2 cards
        } else {
          console.error('No seller products found in response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="relative flex items-center justify-center h-screen bg-white gap-10 pr-10">
      <div className="flex flex-col space-x-4 overflow-hidden justify-start gap-20">
        <div className='flex items-center justify-between'>
          <h1 className='text-4xl text-center font-bold ml-10'><span className='text-red-600'>MACC</span><span className='text-gray-600'> TOP SELLINGS</span></h1>
          <Button className='bg-gray-300'>VIEW ALL</Button>
        </div>
        <div className='flex gap-8'>
        {cards.map((card) => (
          <div
            key={card.id}
            className="transition-transform duration-500 transform scale-100"
          >
            <Card image={card.image} />
            <h1 className='text-3xl text-center font-medium p-6'>sample Product</h1>
          </div>
        ))}
        </div>
      </div>
      <Image 
      src={topImg} 
      alt="top sellings"
      />
    </div>
  );
}
