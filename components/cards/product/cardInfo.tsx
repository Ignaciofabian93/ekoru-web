import Image from "next/image";
import { Star } from "lucide-react";

type CardInfoProps = {
  seller: string;
  sellerImage: string;
  location: string;
  sales: number;
  areNumberOfSalesActivated: boolean;
  isRatingActivated: boolean;
  rating: number;
  title: string;
  description: string;
  price: number;
};

export default function CardInfo({ title, description, price }: CardInfoProps) {
  return (
    <div className="relative w-full h-[50%] flex flex-col items-center justify-between px-4 pt-2">
      <div className="w-full flex flex-col gap-1">
        <p className="text-lg font-semibold truncate">{title}</p>
        <p className="text-base text-gray-600 line-clamp-2">{description}</p>
      </div>
      <p className="text-xl font-bold text-primary">${price?.toLocaleString()}</p>
    </div>
  );
}
