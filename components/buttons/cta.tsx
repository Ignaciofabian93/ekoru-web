import { PiggyBank } from "lucide-react";

export default function CTAButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-[40px] h-[40px] p-2 rounded-full bg-primary-dark border-[1px] border-white flex items-center justify-center shadow hover:brightness-125 transition-all duration-200 ease-in-out relative"
    >
      <PiggyBank className="w-full h-full text-white" strokeWidth={1.5} />
      <span className="absolute -bottom-4 text-xs font-semibold">Vender</span>
    </button>
  );
}
