import { Image3 } from "@/constants/images";
import Image from "next/image";

type ImageCard = {
  src: string;
  alt: string;
};

export default function ImageCard() {
  return (
    <div className="min-w-[200px] w-full max-w-[400px] min-h-[100px] h-full max-h-[200px] rounded-[11px] overflow-hidden shadow-md shadow-slate-900/25">
      <Image src={Image3} alt="img3" className="w-full h-full object-cover" />
    </div>
  );
}
