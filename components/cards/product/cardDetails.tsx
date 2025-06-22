import Button from "@/components/buttons/button";
import { RotateCw, Star } from "lucide-react";
import Image from "next/image";
import co2 from "@/assets/icons/co2.png";
import drop from "@/assets/icons/drop.png";
import waste from "@/assets/icons/trash.png";

type CardDetailsProps = {
  userProfileImage?: string;
  userName?: string;
  userLocation?: string;
  ratings?: number;
  description?: string;
  estimatedCo2SavingsKG?: number;
  estimatedWasteSavingsKG?: number;
  estimatedWaterSavingsLT?: number;
  onBack: () => void;
};

export default function CardDetails({
  userProfileImage,
  userName,
  userLocation,
  ratings,
  description,
  onBack,
  estimatedCo2SavingsKG = 0,
  estimatedWasteSavingsKG = 0,
  estimatedWaterSavingsLT = 0,
}: CardDetailsProps) {
  return (
    <div className="flex flex-col items-center card-gradient w-full h-full relative justify-between pb-3 px-4">
      <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 transition">
          <RotateCw
            className="w-5 h-5 text-primary"
            onClick={(e) => {
              e.stopPropagation();
              onBack();
            }}
          />
        </button>
      </div>
      <div className="flex flex-col items-center mt-8 mb-2">
        {userProfileImage && (
          <Image
            src={userProfileImage}
            alt={userName || "Usuario"}
            width={64}
            height={64}
            className="rounded-full mb-2 object-cover w-[80px] h-[80px] shadow-md"
          />
        )}
        {userName && <p className="font-semibold text-base">{userName}</p>}
        {userLocation && <p className="text-sm text-gray-500">{userLocation}</p>}
        {typeof ratings === "number" && (
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-semibold">{ratings}/5</span>
          </div>
        )}
      </div>
      <p className="text-gray-700 text-sm mb-2 text-center">
        El impacto de tu compra se representa en las siguientes cifras:
      </p>
      <div className="w-full">
        <div className="flex items-center justify-center gap-2 mb-2 text-primary-dark">
          <div className="flex flex-col items-center gap-2 w-[60px]">
            <div className="flex items-center justify-center w-8 h-8">
              <Image src={co2} alt="CO2 savings" width={24} height={24} className="object-contain" />
            </div>
            <span className="text-sm font-semibold">-{estimatedCo2SavingsKG} kg</span>
          </div>
          <div className="flex flex-col items-center gap-2 w-[60px]">
            <div className="flex items-center justify-center w-8 h-8">
              <Image src={drop} alt="Water savings" width={24} height={24} className="object-contain" />
            </div>
            <span className="text-sm font-semibold">-{estimatedWaterSavingsLT} L</span>
          </div>
          <div className="flex flex-col items-center gap-2 w-[60px]">
            <div className="flex items-center justify-center w-8 h-8">
              <Image src={waste} alt="Waste savings" width={24} height={24} className="object-contain" />
            </div>
            <span className="text-sm font-semibold">-{estimatedWasteSavingsKG} kg</span>
          </div>
        </div>
      </div>
      <span className="text-[12px] text-gray-500 text-center">*Los valores son aproximados*</span>
      <Button text="¡Me interesa!" onClick={onBack} size="sm" />
    </div>
  );
}
