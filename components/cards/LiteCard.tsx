import { Image2 } from "@/constants/images";
import Image from "next/image";

export default function LiteCard() {
  return (
    <div className="w-[111px] h-fit flex flex-col items-start justify-center">
      <div className="min-w-[100px] w-full max-w-[111px] min-h-[100px] h-full max-h-[111px] rounded-[11px] overflow-hidden shadow-md shadow-slate-950/25">
        <Image src={Image2} alt="img2" className="w-full h-full object-cover" />
      </div>
      <div className="mt-2 flex flex-col items-start justify-center">
        <span className="text-[10px]">Guitarra acústica</span>
        <span className="text-[8px]">$70.000</span>
      </div>
    </div>
  );
}
