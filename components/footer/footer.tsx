import clsx from "clsx";
import Image from "next/image";
import { Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className={clsx("w-full h-[300px] navbar-gradient", "flex flex-wrap items-center justify-between", "px-4 mt-8")}
    >
      <div className="w-1/3 h-full">
        <p>Artículos</p>
      </div>
      <div className="w-1/3 h-full flex flex-col items-center justify-center">
        <div className="w-1/2 flex items-center justify-center">
          <Image src={"/logo.png"} alt="logo Ekoru" width={4096} height={996} />
        </div>
        <p className="text-primary font-semibold mt-4">&copy; Ekoru 2025</p>
      </div>
      <div className="w-1/3 h-full">
        <p>Información</p>
        <div className="flex items-center justify-center gap-4">
          <Instagram />
          <Twitter />
          <Facebook />
        </div>
      </div>
    </footer>
  );
}
