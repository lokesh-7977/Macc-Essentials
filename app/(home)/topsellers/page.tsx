"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '@/app/(home)/newproducts/card';

interface Product {
  id: string;
  image: string;
  content: string;
}

export default function Page() {
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
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
                <h1>Weekly Offers</h1>

      <div className="flex space-x-4 overflow-hidden">
        {cards.map((card) => (
          <div
            key={card.id}
            className="transition-transform duration-500 transform scale-100"
          >
            <Card image={card.image} />
          </div>
        ))}
      </div>
    </div>
  );
}
