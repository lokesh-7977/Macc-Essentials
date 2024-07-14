
import Image from "next/image";
const Card = ({ image }: { image: string }) => (
    <div className="w-full h-full bg-white border rounded-lg shadow-md overflow-hidden">
      <Image src={image} alt="Product" className="w-full h-full object-cover" />
    </div>
  );
  