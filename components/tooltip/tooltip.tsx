import { ReactNode } from "react";

type TooltipProps = {
  message: string;
  children: ReactNode;
};

export default function Tooltip({ message, children }: TooltipProps) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex items-center justify-center px-4 py-2 bg-black text-white text-xs rounded shadow-lg z-50 w-max max-w-xs text-center">
        {message}
      </div>
    </div>
  );
}
