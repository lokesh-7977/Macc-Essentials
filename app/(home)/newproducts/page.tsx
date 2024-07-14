"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '@/app/(home)/newproducts/card';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
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
            'x-rapidapi-key': 'd93de0bee7msh662b9cdeb6c84d5p1f20a9jsndd3d664e5842'
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
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
    <h1>Best Sellers</h1>
      <Button onClick={handlePrev} className="absolute left-5 md:left-10 bg-gray-200 p-2 rounded-full shadow-md">
        <FaArrowLeft className="text-xl" />
      </Button>

      <div className="flex space-x-4 overflow-hidden">
        {visibleCards.map((card) => (
          <div
            key={card.id}
            className="transition-transform duration-500 transform scale-100"
          >
            <Card image={card.image} />
          </div>
        ))}
      </div>

      <Button onClick={handleNext} className="absolute right-5 md:right-10 bg-gray-200 p-2 rounded-full shadow-md">
        <FaArrowRight className="text-xl" />
      </Button>
    </div>
  );
}
