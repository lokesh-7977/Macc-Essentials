// components/ui/card.tsx
import React from 'react';
import Image from 'next/image';

interface CardProps {
  image: string;
  content: string;
}

export function Card({ image, content }: CardProps) {
  return (
    <div className=" bg-gray-100 p-24 overflow-hidden">
      <Image src={image} alt="Product Image" className="w-full h-48 object-cover bg-none"  width={1045} height={2545}/>
      <div className="p-4">
        <h2 className="text-lg font-bold">{content}</h2>
      </div>
    </div>
  );
}
