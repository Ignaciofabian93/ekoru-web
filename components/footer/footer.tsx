import clsx from "clsx";
import Image from "next/image";
import { FacebookIcon, InstagramIcon, XIcon, YouTubeIcon, LinkedinIcon } from "@/assets/icons";

export default function Footer() {
  return (
    <footer className={clsx("w-full footer-gradient", "flex flex-col items-center justify-between", "px-4 pt-2 mt-8")}>
      <div className="w-full text-center mb-8">
        <p>Artículos y Leyes</p>
      </div>
      <div className="w-full flex flex-col items-center justify-center mb-8">
        <div className="w-[60%] flex items-center justify-center">
          <Image src={"/logo.png"} alt="logo Ekoru" width={4096} height={996} />
        </div>
      </div>
      <div className="w-full mb-8">
        <p className="text-center text-main text-lg font-semibold mb-4">
          Para más información síguenos en nuestras redes sociales
        </p>
        <div className="flex items-center justify-center gap-4">
          <FacebookIcon width={36} height={36} />
          <InstagramIcon width={36} height={36} />
          <XIcon width={36} height={36} />
          <YouTubeIcon width={36} height={36} />
          <LinkedinIcon width={36} height={36} />
        </div>
      </div>
      <p className="text-main font-semibold mt-4">&copy; Ekoru 2025</p>
    </footer>
  );
}
