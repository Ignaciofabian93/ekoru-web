import Image from "next/image";
import co2 from "@/assets/icons/co2.png";
import trash from "@/assets/icons/trash.png";
import drop from "@/assets/icons/drop.png";
import clsx from "clsx";
import { Info, Bean } from "lucide-react";

export default function InfoCard() {
  return (
    <article
      className={clsx(
        "min-w-[350px] w-full max-w-[400px] h-[510px] flex flex-col gap-4",
        "px-6 py-8",
        "rounded-2xl",
        "bg-white",
        "shadow-md shadow-black/30"
      )}
    >
      <div className="w-full flex items-center justify-between gap-2 mb-2">
        <div className="w-[64px] h-[64px] flex items-center justify-center rounded-full overflow-hidden border-[2px] border-primary bg-subtle">
          <Bean className="text-primary" size={26} />
        </div>
        <div className="w-[calc(100%_-_70px)] flex flex-col">
          <p className="text-[14px]">Nivel 1: Eco-intercambiador</p>
          <div className="w-full h-[12px] rounded-full bg-subtle my-2 overflow-hidden">
            <div className="w-1/8 h-full bg-primary" />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[12px] italic">¡Ya germinó tu semilla!</p>
            <p className="text-[12px] italic font-bold">800 puntos</p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-between mb-2">
        <div className="w-full flex items-center justify-between mb-4">
          <div className="w-5/12 flex flex-col items-start justify-center">
            <p className="text-[14px] leading-none">Puntos acumulados</p>
            <p className="text-[32px] font-semibold leading-none">100 pts.</p>
          </div>
          <div className="w-7/12 flex items-center justify-end">
            <span className="px-4 py-2 rounded-full bg-primary text-main-inverted">¡Canjear puntos!</span>
          </div>
        </div>
        <div className="w-full flex items-center justify-start gap-2">
          <p className="text-left text-[14px] text-gray-600">¿Cómo funcionan los puntos?</p>
          <Info size={20} className="text-primary" />
        </div>
      </div>

      <div className="w-full flex flex-col">
        <p className="text-[18px] font-semibold mb-1">¡Tu viaje circular recién comienza!</p>
        <p className="text-[14px]">
          <span className="text-primary italic">0 Intercambios</span> circulares
        </p>
        <p className="text-[14px]">
          <span className="text-primary italic">0 Compras</span> sostenibles
        </p>
        <p className="text-[14px]">
          <span className="text-primary italic">0 Ventas</span> conscientes
        </p>
      </div>

      <div className="w-full flex flex-col">
        <p className="text-gray-600 mb-2">
          Estás entre el <span className="text-primary font-semibold">90% más circular</span> de tu comuna.
        </p>
        <div className="w-full flex items-center justify-evenly">
          <div className="w-1/3 flex flex-col items-center justify-center">
            <Image src={co2} alt="co2" className="w-[36px] h-[36px] object-fill" />
            <span className="text-[12px]">0 kg</span>
            <span className="text-[11px]">Co2 evitado</span>
          </div>
          <div className="w-1/3 flex flex-col items-center justify-center">
            <Image src={trash} alt="trash" width={800} className="w-[36px] h-[36px] object-fill" />
            <span className="text-[12px]">0 kg</span>
            <span className="text-[11px]">Deshechos evitados</span>
          </div>
          <div className="w-1/3 flex flex-col items-center justify-center">
            <Image src={drop} alt="drop" width={800} className="w-[36px] h-[36px] object-fill" />
            <span className="text-[12px]">0 kg</span>
            <span className="text-[11px]">Agua ahorrada</span>
          </div>
        </div>
      </div>
    </article>
  );
}
