import { Heart, Share2, Star } from "lucide-react";
import clsx from "clsx";
import Button from "../buttons/button";
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
  isSharedActivated?: boolean;
  isFavoriteActivated?: boolean;
  isDeleteActivated?: boolean;
  isEditActivated?: boolean;
  isImpactActivated?: boolean;
  isButtonActivated?: boolean;
  areNumberOfSalesActivated?: boolean;
  isRatingActivated?: boolean;
  rating?: number;
  sales?: number;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ProductCard({
  title,
  image,
  price,
  seller,
  location,
  description,
  sellerImage,
  isFavoriteActivated = true,
  isSharedActivated = true,
  isImpactActivated = true,
  isButtonActivated = true,
  areNumberOfSalesActivated = true,
  isRatingActivated = true,
  rating = 4.5,
  sales = 12,
  onClick,
  onEdit,
  onDelete,
}: ProductCard) {
  const sellerPreview = sellerImage || "/brandIcon.webp";
  return (
    <div
      onClick={onClick}
      className={clsx(
        "min-w-[330px] w-full max-w-[350px] h-[440px] flex flex-col justify-between pb-3",
        "rounded-2xl",
        "bg-white",
        "shadow-lg shadow-black/20",
        "overflow-hidden",
        "relative",
        "transition-transform hover:scale-[1.025] hover:shadow-xl"
      )}
    >
      {/* Product Image */}
      <div className="w-full h-[58%] bg-slate-200 relative">
        {image ? (
          <Image
            src={image}
            alt="product"
            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
            width={500}
            height={300}
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">Sin imagen</div>
        )}
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {isFavoriteActivated && (
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 transition">
              <Heart className="text-primary" />
            </button>
          )}
          {isSharedActivated && (
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 transition">
              <Share2 className="text-primary" />
            </button>
          )}
        </div>
      </div>
      {/* Seller & Info */}
      <div className="relative w-full h-[27%] flex items-start justify-between px-4 pt-2">
        <div className="absolute -top-10 left-2 w-[64px] h-[64px] rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-primary shadow">
          <Image src={sellerPreview} alt="seller" className="w-full h-full object-cover" width={100} height={100} />
        </div>
        <div className="w-2/5 pt-6 pl-2">
          <p className="text-[14px] font-semibold truncate">{seller}</p>
          <p className="text-[12px] font-medium text-gray-500 truncate">{location}</p>
          {areNumberOfSalesActivated && <p className="text-[12px] text-gray-400">{sales} ventas exitosas</p>}
          {isRatingActivated && (
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-semibold">{rating}</span>
            </div>
          )}
        </div>
        <div className="w-3/5 flex flex-col gap-1">
          <p className="text-[16px] font-semibold truncate">{title}</p>
          <p className="text-[13px] text-gray-600 line-clamp-2">{description}</p>
          <p className="text-[15px] font-bold text-primary mt-1">${price?.toLocaleString()}</p>
        </div>
      </div>
      {/* Bottom Actions */}
      <div className="px-4 w-full flex items-center justify-between mt-2">
        {isImpactActivated ? (
          <div className="flex flex-col items-center justify-center">
            <Image src={co2} alt="co2" className="w-[24px] h-[24px]" />
            <span className="text-xs text-gray-500">Conoce tu impacto</span>
          </div>
        ) : (
          <div />
        )}
        {isButtonActivated && (
          <div className="w-[55%] flex items-center justify-center">
            <Button text="¡Me interesa!" />
          </div>
        )}
      </div>
    </div>
  );
}
