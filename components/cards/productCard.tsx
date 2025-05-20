import clsx from "clsx";
import Button from "../buttons/button";
import { Heart, Share2 } from "lucide-react";
import co2 from "@/assets/icons/co2.png";
import Image from "next/image";

export default function ProductCard() {
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
        <p>Imagen</p>
      </div>
      <div className="absolute top-0 right-0 w-1/5 h-full flex flex-col items-end justify-start pr-4 py-4 gap-4">
        <Heart />
        <Share2 />
      </div>
      <div className="relative w-full h-[25%] flex items-start justify-between">
        <div className="absolute -top-14 left-4 w-[80px] h-[80px] rounded-full bg-red-300 flex items-center justify-center">
          <p>Imagen usuario</p>
        </div>
        <div className="w-2/5 pt-6 pl-4">
          <p className="text-[14px]">Usuario Apellido</p>
          <p className="text-[14px]">Ubicacion</p>
          <p className="text-[12px]">N ventas exitosas</p>
        </div>
        <div className="w-3/5">
          <p className="text-[16px] font-semibold">Mesa de centro</p>
          <p className="text-[14px]">Tu nueva mesa favorita</p>
          <p className="text-[14px] font-semibold">$25.000</p>
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
