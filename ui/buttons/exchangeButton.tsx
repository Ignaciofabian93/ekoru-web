import clsx from "clsx";
import { RefreshCw } from "lucide-react";

export default function ExchangeButton({
  onClick,
  disabled = false,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "w-[40px] h-[40px] p-2 rounded-full",
        "bg-primary flex items-center justify-center shadow",
        "transition-colors duration-200 ease-in-out relative",
        {
          "cursor-not-allowed opacity-50": disabled,
          "cursor-pointer": !disabled,
          "hover:bg-primary-light": !disabled,
        }
      )}
    >
      <RefreshCw className="w-full h-full text-white" strokeWidth={2.5} />
      <span className="absolute -bottom-4 -right-2 text-[10px] font-bold text-primary">Intercambiar</span>
    </button>
  );
}
