import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

interface ModalProps {
  show: boolean;
  onClose: () => '/';
  message: string;
  imageUrl: string;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, message, imageUrl }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative">
       <button  className="absolute top-4 right-4 text-gray-600">
          &times;
        </button>
        <div className="text-center">
          <Image src={'https://s3-alpha-sig.figma.com/img/5d8c/c585/7dda1f9cce2a47ba0daf6a6e5785c931?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IB3DDM4vjUkUPX5RH12HP48cVsT2wGuNspok-dYDo8G-uCwGDK1opEOT9DOYxivClSI0LmGfKMKo2FXp~PowW3aDKyYTgbqdgMquufVV00tBd0-nDa3Tw85GHnxzCH0xX~T2h8~SyULgZ3n5sv4asvHptiBvqgfGmYxdH9LybUTPxIeMEe0FFBYOkAIZFcp5PTVJ47nuGcbtS-zAuEECWsEX~bKAahPUnQCpYTkfJGV601fFLWLTVpXnis-7Se7sH~KKfflAWMctIWyIJmF8gllF~5EC4P5PJsfa16vreJwHZiOdTZrgPKW2nccRK82IitqzA1M~JWzc~BRFV3FD-w__'} alt="Order placed" width={400} height={400} className="w-full h-auto rounded" />
          <h2 className="text-4xl font-bold mt-4">Order Placed Successfully</h2>
          <p className="mt-2 text-gray-600">Your Order Has Been Placed Successfull We ll Try To Ship It To Your Door Step As Soon We Can. Cheer</p>
          <Link href={'/'}>
          <Button onClick={onClose} className="bg-blue-800 text-white mt-6">CONTINUE SHOPPING</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
