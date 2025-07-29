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
    <div className="max-w-[164px] w-full h-full relative flex flex-col justify-between pb-2 card-gradient items-center">
      {" "}
      {/* Adjusted padding */}
      {/* Floating Cloud Message */}
      {isMessageVisible && (
        <div
          className={clsx("fixed left-1/2 top-[25%] z-50 -translate-x-1/2 w-[90%]", "pointer-events-auto")}
        >
          <div
            className={clsx(
              "relative bg-white shadow-lg px-4 py-3 rounded-2xl border border-gray-200 flex flex-col items-center transition-all duration-200",
              animate ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            )}
          >
            <button
              className="absolute top-2 right-3 text-gray-400 hover:text-primary text-sm"
              onClick={handleCloseMessage}
              aria-label="Cerrar"
            >
              ×
            </button>
            <span className="block text-primary-dark text-xs font-semibold mb-1">Equivale a:</span>
            <span className="block text-gray-700 text-center text-[10px] leading-relaxed">
              {impactMessage}
            </span>
          </div>
        </div>
      )}
      {/* Card Content */}
      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
        {" "}
        {/* Adjusted spacing */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBack();
          }}
          className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 transition"
        >
          <RotateCw className="w-3.5 h-3.5 text-primary" />
        </button>
      </div>
      <button
        className="flex flex-col items-center mt-5 mb-2 w-full px-1 cursor-pointer"
        onClick={() => (userId ? router.push(`/user/${userId}`) : null)}
      >
        {userProfileImage && (
          <Image
            src={userProfileImage}
            alt={userName || "Usuario"}
            width={40}
            height={40}
            className="rounded-full mb-1 object-cover w-[40px] h-[40px] shadow-md"
          />
        )}
        {userName && (
          <p className="font-semibold text-[12px] text-center leading-tight mb-0.5 line-clamp-1">
            {userName}
          </p>
        )}
        {userLocation && (
          <p className="text-[10px] text-gray-500 text-center leading-tight line-clamp-2">{userLocation}</p>
        )}
      </button>
      <div className="w-full">
        <p className="text-gray-700 text-[10px] mb-2 text-center px-1">
          Esto es lo que ahorras al no comprar un producto nuevo:
        </p>
        <div className="flex items-center justify-between gap-1 mb-1 text-primary-dark w-full">
          {" "}
          {/* Adjusted spacing */}
          <div
            className="flex flex-col items-center w-[40px] cursor-pointer relative"
            onClick={handleCo2Click}
          >
            <Info className="w-[12px] h-[12px] mb-0.5" />
            <div className="flex items-center justify-center w-9 h-8 mb-1">
              <Image src={co2} alt="CO2 savings" width={24} height={24} className="object-contain" />
            </div>
            <span className="text-[10px] font-semibold absolute -bottom-2">
              {totalCo2Savings.toFixed(1)} kg
            </span>
          </div>
          <div
            className="flex flex-col items-center w-[40px] cursor-pointer relative"
            onClick={handleWaterClick}
          >
            <Info className="w-[12px] h-[12px] mb-0.5" />
            <div className="flex items-center justify-center w-9 h-8 mb-1">
              <Image src={drop} alt="Water savings" width={18} height={18} className="object-contain" />
            </div>
            <span className="text-[10px] font-semibold absolute -bottom-2">
              {totalWaterSavings.toFixed(1)} L
            </span>
          </div>
          <div
            className="flex flex-col items-center w-[40px] cursor-pointer relative"
            onClick={handleWasteClick}
          >
            <Info className="w-[12px] h-[12px] mb-0.5" />
            <div className="flex items-center justify-center w-9 h-8 mb-1">
              <Image src={waste} alt="Waste savings" width={22} height={22} className="object-contain" />
            </div>
            <span className="text-[10px] font-semibold absolute -bottom-2">
              {totalWasteSavings.toFixed(1)} kg
            </span>
          </div>
        </div>
      </div>
      <span className="text-[8px] text-gray-500 text-center mb-1">*Los valores son aproximados*</span>
      <div className="w-full flex justify-center px-1">
        <Button
          disabled={!isCTAClickEnabled}
          text={
            isSelectionButtonEnabled ? "¡Seleccionar!" : isExchangeable ? "¡Intercambiar!" : "¡Me interesa!"
          }
          size="md" // Adjusted button size
          onClick={() => {}}
        />
      </div>
    </div>
  );
}
