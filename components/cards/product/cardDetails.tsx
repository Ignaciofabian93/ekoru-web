import { RotateCw } from "lucide-react";
import Image from "next/image";
import co2 from "@/assets/icons/co2.png";
import drop from "@/assets/icons/drop.png";
import waste from "@/assets/icons/trash.png";

type CardDetailsProps = {
  userProfileImage?: string;
  userName?: string;
  userLocation?: string;
  description?: string;
  totalCo2Savings?: number;
  totalWasteSavings?: number;
  totalWaterSavings?: number;
  onBack: () => void;
};

export default function CardDetails({
  userProfileImage,
  userName,
  userLocation,
  onBack,
  totalCo2Savings = 0,
  totalWasteSavings = 0,
  totalWaterSavings = 0,
}: CardDetailsProps) {
  return (
    <div className="flex flex-col items-center card-gradient w-full h-full relative justify-between pb-3 px-4">
      <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBack();
          }}
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 transition"
        >
          <RotateCw className="w-4 h-4 text-primary" />
        </button>
      </div>
      <div className="flex flex-col items-center mt-8 mb-2">
        {userProfileImage && (
          <Image
            src={userProfileImage}
            alt={userName || "Usuario"}
            width={45}
            height={45}
            className="rounded-full mb-2 object-cover w-[60px] h-[60px] shadow-md"
          />
        )}
        {userName && <p className="font-semibold text-base line-clamp-2">{userName}</p>}
        {userLocation && <p className="text-sm text-gray-500 line-clamp-2">{userLocation}</p>}
      </div>
      <div className="w-full">
        <p className="text-gray-700 text-xs mb-2 text-center">
          El impacto de tu compra se representa en las siguientes cifras:
        </p>
        <div className="flex items-center justify-center gap-2 mb-2 text-primary-dark">
          <div className="flex flex-col items-center w-[70px]">
            <div className="flex items-center justify-center w-7 h-7">
              <Image src={co2} alt="CO2 savings" width={22} height={22} className="object-contain" />
            </div>
            <span className="text-xs font-semibold">-{totalCo2Savings.toFixed(1)} kg</span>
          </div>

          <div className="flex flex-col items-center w-[70px]">
            <div className="flex items-center justify-center w-7 h-7">
              <Image src={drop} alt="Water savings" width={22} height={22} className="object-contain" />
            </div>
            <span className="text-xs font-semibold">-{totalWaterSavings} L</span>
          </div>

          <div className="flex flex-col items-center w-[70px]">
            <div className="flex items-center justify-center w-7 h-7">
              <Image src={waste} alt="Waste savings" width={22} height={22} className="object-contain" />
            </div>
            <span className="text-xs font-semibold">-{totalWasteSavings} kg</span>
          </div>
        </div>
      </div>
      <span className="text-[12px] text-gray-500 text-center">*Los valores son aproximados*</span>
    </div>
  );
}
