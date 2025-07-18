import { RefreshCw } from "lucide-react";

export default function ExchangeButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-[40px] h-[40px] p-2 rounded-full bg-primary flex items-center justify-center shadow hover:bg-primary-light transition-colors duration-200 ease-in-out relative"
    >
      <RefreshCw className="w-full h-full text-white" strokeWidth={2.5} />
    </button>
  );
}
