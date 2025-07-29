import { useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCw, Info } from "lucide-react";
import Image from "next/image";
import co2 from "@/assets/icons/co2.png";
import drop from "@/assets/icons/drop.png";
import waste from "@/assets/icons/trash.png";
import Button from "@/ui/buttons/button";
import useImpactDetails from "@/app/(home)/product/_hooks/useImpactDetails";
import clsx from "clsx";

type CardDetailsProps = {
  userId?: string;
  userProfileImage?: string;
  userName?: string;
  userLocation?: string;
  description?: string;
  totalCo2Savings?: number;
  totalWasteSavings?: number;
  totalWaterSavings?: number;
  isSelectionButtonEnabled?: boolean;
  isExchangeable?: boolean;
  isCTAClickEnabled?: boolean;
  onBack: () => void;
};

function getRandomMessage(obj: Record<string, string>) {
  const keys = ["message1", "message2", "message3"];
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return obj[randomKey];
}

export default function CardDetails({
  userId,
  userProfileImage,
  userName,
  userLocation,
  onBack,
  totalCo2Savings = 0,
  totalWasteSavings = 0,
  totalWaterSavings = 0,
  isSelectionButtonEnabled = false,
  isExchangeable = false,
  isCTAClickEnabled = true,
}: CardDetailsProps) {
  const router = useRouter();
  const [impactMessage, setImpactMessage] = useState<string>("");
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(false);
  const { fetchCo2ImpactMessages, fetchWaterImpactMessages } = useImpactDetails();

  const showMessage = (msg: string) => {
    setImpactMessage(msg);
    setIsMessageVisible(true);
    setAnimate(false);
    setTimeout(() => setAnimate(true), 10); // trigger animation
  };

  const handleCo2Click = async () => {
    const messages = await fetchCo2ImpactMessages(totalCo2Savings);
    if (messages) {
      showMessage(getRandomMessage(messages));
    }
  };

  const handleWaterClick = async () => {
    const messages = await fetchWaterImpactMessages(totalWaterSavings);
    if (messages) {
      showMessage(getRandomMessage(messages));
    }
  };

  const handleWasteClick = () => {
    showMessage(`Evitar ${totalWasteSavings} kg de residuos`);
  };

  const handleCloseMessage = () => {
    setAnimate(false);
    setTimeout(() => setIsMessageVisible(false), 200);
  };

  return (
    <div className="max-w-[164px] w-full h-full relative flex flex-col justify-between pb-3 card-gradient items-center">
      {/* Floating Cloud Message */}
      {isMessageVisible && (
        <div
          className={clsx("fixed left-1/2 top-[30%] z-50 -translate-x-1/2 w-[90%]", "pointer-events-auto")}
        >
          <div
            className={clsx(
              "relative bg-white shadow-lg px-6 py-4 rounded-3xl border border-gray-200 flex flex-col items-center transition-all duration-200",
              animate ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            )}
            style={{
              boxShadow: "0 8px 32px 0 rgba(60,60,60,0.18), 0 1.5px 0 0 #e0e0e0",
            }}
          >
            <button
              className="absolute top-2 right-3 text-gray-400 hover:text-primary text-lg"
              onClick={handleCloseMessage}
              aria-label="Cerrar"
            >
              ×
            </button>
            <span className="block text-primary-dark text-sm font-semibold mb-2">Equivale a:</span>
            <span className="block text-gray-700 text-center text-xs leading-relaxed">{impactMessage}</span>
          </div>
        </div>
      )}

      {/* Card Content */}
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
      <button
        className="flex flex-col items-center mt-7 mb-3 w-full px-2 cursor-pointer"
        onClick={() => (userId ? router.push(`/user/${userId}`) : null)}
      >
        {userProfileImage && (
          <Image
            src={userProfileImage}
            alt={userName || "Usuario"}
            width={45}
            height={45}
            className="rounded-full mb-2 object-cover w-[45px] h-[45px] shadow-md"
          />
        )}
        {userName && (
          <p className="font-semibold text-[13px] text-center leading-tight mb-1 line-clamp-1">{userName}</p>
        )}
        {userLocation && (
          <p className="text-[11px] text-gray-500 text-center leading-tight line-clamp-2">{userLocation}</p>
        )}
      </button>
      <div className="w-full">
        <p className="text-gray-700 text-[11px] mb-3 text-center px-2">
          Esto es lo que ahorras al no comprar un producto nuevo:
        </p>
        <div className="flex items-center justify-between gap-2 mb-2 text-primary-dark w-full">
          <div
            className="flex flex-col items-center w-[48px] cursor-pointer relative"
            onClick={handleCo2Click}
          >
            <Info className="w-[14px] h-[14px] mb-1" />
            <div className="flex items-center justify-center w-9 h-8 mb-1">
              <Image src={co2} alt="CO2 savings" width={24} height={24} className="object-contain" />
            </div>
            <span className="text-[10px] font-semibold absolute -bottom-2">
              {totalCo2Savings.toFixed(1)} kg
            </span>
          </div>

          <div
            className="flex flex-col items-center w-[48px] cursor-pointer relative"
            onClick={handleWaterClick}
          >
            <Info className="w-[14px] h-[14px] mb-1" />
            <div className="flex items-center justify-center w-9 h-8 mb-1">
              <Image src={drop} alt="Water savings" width={18} height={18} className="object-contain" />
            </div>
            <span className="text-[10px] font-semibold absolute -bottom-2">
              {totalWaterSavings.toFixed(1)} L
            </span>
          </div>

          <div
            className="flex flex-col items-center w-[48px] cursor-pointer relative"
            onClick={handleWasteClick}
          >
            <Info className="w-[14px] h-[14px] mb-1" />
            <div className="flex items-center justify-center w-9 h-8 mb-1">
              <Image src={waste} alt="Waste savings" width={22} height={22} className="object-contain" />
            </div>
            <span className="text-[10px] font-semibold absolute -bottom-2">
              {totalWasteSavings.toFixed(1)} kg
            </span>
          </div>
        </div>
      </div>
      <span className="text-[9px] text-gray-500 text-center mb-2">*Los valores son aproximados*</span>
      <div className="w-full flex justify-center px-2">
        <Button
          disabled={!isCTAClickEnabled}
          text={
            isSelectionButtonEnabled ? "¡Seleccionar!" : isExchangeable ? "¡Intercambiar!" : "¡Me interesa!"
          }
          size="lg"
          onClick={() => {}}
        />
      </div>
    </div>
  );
}
