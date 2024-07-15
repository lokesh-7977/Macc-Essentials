"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface Product {
  id: string;
  image: string;
  content: string;
  description: string;
  price: string;
  originalPrice: string;
  about: string[];
}

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async (id: string) => {
      try {
        const response = await axios.get('https://real-time-amazon-data.p.rapidapi.com/product-details', {
          params: {
            asin: id,
            country: 'US'
          },
          headers: {
            'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
            'x-rapidapi-key': 'db0746436bmshc933250559a46d7p194c8ejsne07f00c7b173' // Replace with your actual API key
          }
        });

        console.log('API Response:', response.data);

        const productData = response.data?.data;
        if (productData) {
          setProduct({
            id: productData.asin,
            image: productData.product_photo,
            content: productData.product_title,
            description: productData.product_description || 'No description available.',
            price: productData.product_price,
            originalPrice: productData.product_original_price,
            about: productData.about_product,
          });
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchProduct(params.id);
    }
  }, [params]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.content}</h1>
      <Image src={product.image} alt={product.content} width={400} height={400} className="w-full max-w-lg mt-4" />
      <p className="mt-4">{product.description}</p>
      <p className="mt-4 text-lg font-semibold">Price: {product.price}</p>
      <p className="text-gray-500 line-through">Original Price: {product.originalPrice}</p>
      <h2 className="text-xl font-bold mt-6">About Product</h2>
    </div>
  );
};

export default ProductDetail;
