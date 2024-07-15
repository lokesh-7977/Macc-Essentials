"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '@/app/(home)/newproducts/card';
import { FaArrowLeft, FaArrowRight, FaGreaterThan, FaLessThan } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  image: string;
  content: string;
}

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cards, setCards] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://real-time-amazon-data.p.rapidapi.com/seller-products?seller_id=A02211013Q5HP3OMSZC7W&country=US&page=1', {
          headers: {
            'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
            // 'x-rapidapi-key': 'd8e882a5bcmsh0c5c82cfa9ef49ep1b48d7jsn66bb991bb5cd'
            'x-rapidapi-key': 'd7b0ceb475msh769a5ad34fda6e5p1923fcjsnd752266e88a3'
          }
        });

        const sellerProducts = response.data?.data?.seller_products;

        if (sellerProducts) {
          const fetchedCards = sellerProducts.map((product: any) => ({
            id: product.asin,
            image: product.product_photo,
          }));

          setCards(fetchedCards);
        } else {
          console.error('No seller products found in response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 3 : prevIndex - 3));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === cards.length - 3 ? 0 : prevIndex + 3));
  };

  if (cards.length === 0) {
    return <div>Loading...</div>;
  }

  const visibleCards = cards.slice(currentIndex, currentIndex + 3);

  return (
    <div className='bg-white pt-10 pb-4'>
    <h1 className='text-3xl text-center font-bold mt-12 mb-8'><span className='mr-3 text-red-700'>NEW</span><span className='text-blue-800'>PRODUCTS</span></h1>
    <div className="relative flex items-center justify-center">
      <Button onClick={handlePrev} className="absolute left-5 md:left-10 bg-white p-2 rounded-full shadow-md">
        <FaLessThan className="text-xl" />
      </Button>

      <div className="flex space-x-4 overflow-hidden">
        {visibleCards.map((card) => (
          <div
            key={card.id}
            className="transition-transform duration-500 transform scale-100 flex-2 bg-gray-100 p-10"
          >
            <Card 
            image={card.image} />
          </div>
        ))}
      </div>

      <Button onClick={handleNext} className="absolute right-5 md:right-10 bg-white p-2 rounded-full shadow-md">
        <FaGreaterThan className="text-xl" />
      </Button>
    </div>
  </div>
  );
}
