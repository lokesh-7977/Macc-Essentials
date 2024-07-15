"use client";
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Card } from '@/app/(home)/newproducts/card';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { CgSelect } from 'react-icons/cg';

interface Product {
  id: string;
  image: string;
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
          'x-rapidapi-key': 'd7b0ceb475msh769a5ad34fda6e5p1923fcjsnd752266e88a3'
          // 'x-rapidapi-key': 'd8e882a5bcmsh0c5c82cfa9ef49ep1b48d7jsn66bb991bb5cd'
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
        width= {2040}
        height={100} 
        className="object-cover mb-4"
      />

      <div className='flex gap-20 p-10'>
        <div className='flex flex-col gap-6 md:max-w-md md:hidden'>
          <div className='flex justify-between gap-40'>
            <p className='font-light'>COMPANY</p>
            <CgSelect className='size-6 font-thin'/>
          </div><hr/>
          <div className='flex justify-between'>
            <p className='font-light'>PRICE</p>
            <CgSelect className='size-6 font-thin'/>
          </div><hr/>
          <div className='flex justify-between'>
            <p className='font-light'>CATEGORIES</p>
            <CgSelect className='size-6 font-thin'/>
          </div><hr/>
        </div>
        <div className='flex flex-col justify-start gap-10'>
          <div className='flex justify-between items-start gap-40 p-4'>
            <h1>{products.length} Products</h1>
            <select className='font-light border-neutral-500 border-2 p-2'>
              <option className='pr-80'>SORT</option>
            </select>
          </div>
          <div className="relative flex flex-col items-center justify-center p-4">
            {/* <h1 className="text-2xl font-bold mb-4">Best Sellers</h1> */}
        
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {products.map((product) => (
                <Card key={product.id}  image={product.image} />
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
