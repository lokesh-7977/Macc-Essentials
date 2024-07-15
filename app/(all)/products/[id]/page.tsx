"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../redux/cartslice";
import { toast } from 'react-toastify';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


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
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async (id: string) => {
      try {
        const response = await axios.get('https://real-time-amazon-data.p.rapidapi.com/product-details', {
          params: {
            asin: id,
            country: 'US',
          },
          headers: {
            'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
            'x-rapidapi-key': '74732a0dd0msha08ffddab885698p105dbbjsn6998bcc73b3f', // Replace with your actual API key
          },
        });

        console.log("API Response:", response.data);

        const productData = response.data?.data;
        if (productData) {
          setProduct({
            id: productData.asin,
            image: productData.product_photo,
            content: productData.product_title,
            description:
              productData.product_description || "No description available.",
            price: productData.product_price,
            originalPrice: productData.product_original_price,
            about: productData.about_product || [],
          });
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchProduct(params.id);
    }
  }, [params]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      toast.success('Product added to cart successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Product not found.</p>
      </div>
    );
  }

  return (
    // <div className="p-6 max-w-4xl mx-auto">
    //   <h1 className="text-3xl font-bold text-center mb-4">{product.content}</h1>
    //   <div className="flex flex-col md:flex-row items-center md:items-start">
    //     <div className="w-full md:w-1/2 flex justify-center">
    //       <Image
    //         src={product.image}
    //         alt={product.content}
    //         width={400}
    //         height={400}
    //         className="w-full max-w-lg mt-4 rounded-lg shadow-lg"
    //       />
    //     </div>
    //     <div className="w-full md:w-1/2 md:pl-6 mt-6 md:mt-0">
    //       <p className="text-lg mt-4">{product.description}</p>
    //       <p className="mt-4 text-xl font-semibold">
    //         Price: <span className="text-green-500">{product.price}</span>
    //       </p>
    //       <p className="text-gray-500 line-through">
    //         Original Price: {product.originalPrice}
    //       </p>
    //       <h2 className="text-2xl font-bold mt-6">About Product</h2>
    //       <ul className="list-disc list-inside mt-2 space-y-1">
    //         {product.about.map((item, index) => (
    //           <li key={index} className="text-lg">
    //             {item}
    //           </li>
    //         ))}
    //       </ul>
    //       <div className="flex mt-6 space-x-4">
    //         <button
    //           onClick={handleAddToCart}
    //           className="bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 transition duration-300"
    //         >
    //           Add to Cart
    //         </button>
    //         <button
    //           onClick={() => router.push("/products")}
    //           className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
    //         >
    //           Back to Products
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className='flex fex-col p-20'>
      <ul className="flex gap-6">
        <li>Home<span className="ml-4">/</span></li>
        <li>Products<span className="ml-4">/</span></li>
        <li>Product</li>
      </ul>
      <div className="flex md:flex-row items-center md:items-start gap-10 mt-4">
          <div className="flex flex-col gap-4">
            {[...Array(4)].map((_, index) => (
              <Image key={index} src={product.image} alt={product.content} width={80} height={80} className="w-20 h-20" />
            ))}
          </div>
          <Image src={product.image} alt={product.content} width={400} height={400} className="w-full max-w-md bg-gray-300" />
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{product.content.split(" ")[1]}</h1>
            <p className="mt-4 text-lg font-semibold text-red-500">{product.price}</p>
            <div className="flex gap-2 mt-4">
              {["BLACK", "GOLD", "APOLLO"].map((variant) => (
                <Button key={variant} className="border-gray-200 p-2">{variant}</Button>
              ))}
            </div>
            <Button onClick={handleAddToCart} className="bg-blue-800 text-white mt-4">ADD TO CART</Button>
            <p>{product.about}</p>
            <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
        <AccordionTrigger>DESCRIPTION</AccordionTrigger>
        <AccordionContent>
          {product.description}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>RETURN POLICY</AccordionTrigger>
        <AccordionContent>
        RETURN POLICY
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>PRIVACY POLICY</AccordionTrigger>
        <AccordionContent>
        PRIVACY POLICY
        </AccordionContent>
      </AccordionItem>

            </Accordion>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
