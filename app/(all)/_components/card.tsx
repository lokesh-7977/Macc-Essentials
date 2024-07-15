// /app/components/Card.tsx
"use client";
import Link from 'next/link';
import Image from 'next/image';

interface CardProps {
  id: string;
  image: string;
  content: string;
}

export const Card = ({ id, image, content }: CardProps) => (
  <Link href={`/product/${id}`} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <Image src={image} alt={content} width={200} height={200} className="object-cover rounded-lg" />
    <h2 className="mt-2 text-lg font-semibold">{content}</h2>
  </Link>
);
