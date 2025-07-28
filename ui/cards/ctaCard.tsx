import { PackageOpen } from "lucide-react";
import label from "@/assets/icons/label.png";
import coloredDrop from "@/assets/icons/drop-colored.png";
import brandIcon from "@/assets/icons/brandIcon.webp";
import Image from "next/image";
import Button from "../buttons/button";
import clsx from "clsx";

type CTACard = {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  rewards: React.ReactNode;
};

export default function CTACard() {
  return (
    <article
      className={clsx(
        "min-w-[350px] w-full max-w-[400px] h-[470px] flex flex-col gap-4",
        "px-6 py-8",
        "rounded-2xl",
        "bg-subtle",
        "shadow-md shadow-black/30",
        "border-[4px] border-secondary"
      )}
    >
      <div className="w-full flex items-center justify-center">
        <h4 className="text-[26px] text-center leading-none">
          ¡Dale una <span className="font-semibold">nueva vida</span> a lo que ya no usas!
        </h4>
      </div>

      <div className="w-full flex items-center justify-between gap-1">
        <div className="w-[70px] h-[70px] flex items-center justify-center rounded-full border-[2px] border-primary overflow-hidden">
          <PackageOpen size={40} className="text-primary" />
        </div>
        <p className="text-[16px] font-semibold w-2/3">Sube tu primer producto al Marketplace</p>
      </div>

      <div className="w-[80%] flex flex-col items-center justify-center gap-2 mx-auto">
        <div className="w-full flex items-center justify-between gap-2">
          <Image src={label} alt="insignia" className="w-[32px] h-[32px]" />
          <p className="text-[14px] text-left w-full">Ganarás tu primera insignia</p>
        </div>
        <div className="w-full flex items-center justify-between gap-2">
          <Image src={coloredDrop} alt="gota" className="w-[32px] h-[32px]" />
          <p className="text-[14px] text-left w-full">Impacto visible en tu perfil</p>
        </div>
        <div className="w-full flex items-center justify-between gap-2">
          <Image src={brandIcon} alt="insignia" className="w-[32px] h-[32px]" />
          <p className="text-[14px] text-left w-full">Acumula 100 puntos</p>
        </div>
      </div>
      <div className="w-[80%] flex items-center justify-center mx-auto">
        <p className="text-[14px] text-center italic">Más de 1.600 personas ya dieron su primer paso verde</p>
      </div>
      <div className="w-full flex items-center justify-center">
        <Button text="¡Hazlo circular!" />
      </div>
    </article>
  );
}
