import { ReactNode } from "react";

// Add placement prop type
export type TooltipPlacement = "top" | "bottom" | "left" | "right";

type TooltipProps = {
  message: string;
  children: ReactNode;
  placement?: TooltipPlacement;
};

export default function Tooltip({ message, children, placement = "top" }: TooltipProps) {
  // Define position classes based on placement
  let positionClass = "";
  switch (placement) {
    case "top":
      positionClass = "bottom-full left-1/2 -translate-x-1/2 mb-2";
      break;
    case "bottom":
      positionClass = "top-full left-1/2 -translate-x-1/2 mt-2";
      break;
    case "left":
      positionClass = "right-full top-1/2 -translate-y-1/2 mr-2";
      break;
    case "right":
      positionClass = "left-full top-1/2 -translate-y-1/2 ml-2";
      break;
    default:
      positionClass = "bottom-full left-1/2 -translate-x-1/2 mb-2";
  }

  return (
    <div className="relative group">
      {children}
      <div
        className={`absolute ${positionClass} hidden group-hover:flex items-center justify-center px-4 py-2 bg-primary-dark text-white text-xs rounded shadow-lg z-50 w-max max-w-xs text-center`}
      >
        {message}
      </div>
    </div>
  );
}
