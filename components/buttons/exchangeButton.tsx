import { RefreshCw } from "lucide-react";

export default function ExchangeButton({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-[40px] h-[40px] p-2 rounded-full bg-primary flex items-center justify-center shadow hover:bg-primary-light transition-colors duration-200 ease-in-out relative"
    >
      <RefreshCw className="w-full h-full text-white" strokeWidth={2.5} />
      <span className="absolute -bottom-4 -right-2 text-[10px] font-bold text-primary">Intercambiar</span>
    </button>
  );
}
