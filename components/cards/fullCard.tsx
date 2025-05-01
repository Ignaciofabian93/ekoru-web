import { Image1 } from "@/constants/images";
import Image from "next/image";

export default function FullCard() {
  return (
    <div className="min-w-[100px] w-full max-w-[111px] h-[190px] flex flex-col items-start justify-between overflow-hidden shadow-md shadow-slate-950/25 rounded-[11px]">
      <Image src={Image1} alt="img1" className="w-full h-[114px] object-cover" />
      <div className="w-full h-[85px] flex flex-col items-start justify-center px-2 ">
        <span className="text-[12px]">Iphone 5</span>
        <span className="text-[11px] text-[#7a7a7a] leading-3">Iphone 5 usado</span>
        <span className="text-[9px] text-[#7a7a7a] line-through leading-3">$150.000</span>
        <span className="text-[10px] leading-3">$120.000</span>
      </div>
    </div>
  );
}
