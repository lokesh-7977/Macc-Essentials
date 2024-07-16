"use client";
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Card } from '@/app/(home)/newproducts/card';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link'; 
import { CgSelect } from 'react-icons/cg';

interface Product {
  id: string;
  image: string;
  content: string;
}

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProducts = useCallback(async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://real-time-amazon-data.p.rapidapi.com/seller-products?seller_id=A02211013Q5HP3OMSZC7W&country=US&page=${pageNumber}`, {
        headers: {
          'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
          'x-rapidapi-key': '88b0e0e255msh722b0e3e50e7cd5p1128b9jsne820c1d2b771'
        }
      });

      const sellerProducts = response.data?.data?.seller_products;

      if (sellerProducts && sellerProducts.length > 0) {
        setProducts((prevProducts) => [
          ...prevProducts,
          ...sellerProducts.map((product: any) => ({
            id: product.asin,
            image: product.product_photo,
            content: product.product_title
          }))
        ]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(page);
  }, [page, fetchProducts]);

  const { ref: loaderRef, inView } = useInView({
    threshold: 1.0,
    onChange: (inView) => {
      if (inView && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  });

  console.log(products);

  return (
    <>
      <Image 
        src={'https://gcdnb.pbrd.co/images/rnMVj6taeole.png?o=1'} 
        alt='Fixx' 
        width={2000}
        height={500}
        className="w-full object-cover mb-4" 
        style={{ height: '50vh', width: '100%' }} // Adjusted height to 50% of viewport height
      />

      <div className='flex flex-col lg:flex-row gap-10 p-4 lg:p-10'>
        <div className='flex flex-col gap-6 md:max-w-md'>
          <div className='flex justify-between'>
            <p className='font-light'>COMPANY</p>
            <CgSelect className='size-6 font-thin'/>
          </div>
          <hr/>
          <div className='flex justify-between'>
            <p className='font-light'>PRICE</p>
            <CgSelect className='size-6 font-thin'/>
          </div>
          <hr/>
          <div className='flex justify-between'>
            <p className='font-light'>CATEGORIES</p>
            <CgSelect className='size-6 font-thin'/>
          </div>
          <hr/>
        </div>

        <div className='flex flex-col justify-start gap-10 w-full'>
          <div className='flex justify-between items-start gap-4 p-2'>
            <h1>{products.length} Products</h1>
            <select className='font-light border-neutral-500 border-2 p-2'>
              <option className='pr-80'>SORT</option>
            </select>
          </div>
          <div className="relative flex flex-col items-center justify-center p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card image={product.image} content={product.content} /> {/* Display product title */}
                </Link>
              ))}
            </div>

            {loading && <p className="mt-4">Loading...</p>}
            <div ref={loaderRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
