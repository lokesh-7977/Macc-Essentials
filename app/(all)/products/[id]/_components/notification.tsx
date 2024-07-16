import React from 'react';
import Link from 'next/link';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <span>SUCCESSFULLY ADDED TO CART</span>
        <Link href="/checkout">
          <button onClick={onClose} className="ml-4 bg-green-700 px-2 py-1 rounded hover:bg-green-800 transition duration-300">
            Check Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Notification;
