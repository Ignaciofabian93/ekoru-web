import clsx from "clsx";
import Button from "../buttons/button";
import { Heart, Share2 } from "lucide-react";
import co2 from "@/assets/icons/co2.png";
import Image from "next/image";

type ProductCard = {
  title?: string;
  image?: string;
  price?: number;
  seller?: string;
  sellerImage?: string;
  location?: string;
  description?: string;
};

export default function ProductCard({ title, image, price, seller, location, description, sellerImage }: ProductCard) {
  const sellerPreview = sellerImage || "/brandIcon.webp";
  return (
    <div
      className={clsx(
        "min-w-[330px] w-full max-w-[350px] h-[410px] flex flex-col justify-between pb-2",
        "rounded-2xl",
        "bg-white",
        "shadow-md shadow-black/30",
        "overflow-hidden",
        "relative"
      )}
    >
      <div className="w-full h-[60%] bg-slate-700">
        {image ? (
          <Image src={image} alt="product" className="w-full h-full object-cover" width={500} height={300} priority />
        ) : null}
      </div>
      <div className="absolute top-0 right-0 w-1/5 h-full flex flex-col items-end justify-start pr-4 py-4 gap-4">
        <div className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center cursor-pointer">
          <Heart className="text-primary" />
        </div>
        <div className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center cursor-pointer">
          <Share2 className="text-primary" />
        </div>
      </div>
      <div className="relative w-full h-[25%] flex items-start justify-between">
        <div className="absolute -top-14 left-4 w-[80px] h-[80px] rounded-full bg-white flex items-center justify-center overflow-hidden">
          <Image src={sellerPreview} alt="seller" className="w-full h-full object-cover" width={100} height={100} />
        </div>
        <div className="w-2/5 pt-6 pl-4">
          <p className="text-[14px] font-semibold">{seller}</p>
          <p className="text-[12px] font-semibold">{location}</p>
          <p className="text-[12px]">N ventas exitosas</p>
        </div>
        <div className="w-3/5">
          <p className="text-[16px] font-semibold">{title}</p>
          <p className="text-[14px]">{description}</p>
          <p className="text-[14px] font-semibold">{price}</p>
        </div>
      </div>
      <div className="px-4 w-full flex items-center justify-between">
        <div className="flex flex-col items-center justify-center">
          <Image src={co2} alt="co2" className="w-[24px] h-[24px]" />
          <span className="text-xs">Conoce tu impacto</span>
        </div>
        <div className="w-[50%] flex item-center justify-center">
          <Button text="¡Me interesa!" />
        </div>
      </div>
    </div>
  );
}
