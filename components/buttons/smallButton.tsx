import clsx from "clsx";
import { LucideIcon } from "lucide-react";

interface SmallButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  text: string;
  variant?: "primary" | "danger";
  "aria-label": string;
}

export default function SmallButton({
  icon: Icon,
  text,
  variant = "primary",
  className,
  disabled = false,
  ...rest
}: SmallButtonProps) {
  return (
    <button
      className={clsx(
        "flex items-center gap-1 px-3 h-8 rounded-full transition-all duration-200 text-xs font-medium",
        "border-[1px]",
        {
          "bg-primary text-main-inverted border-primary hover:brightness-110": variant === "primary",
          "bg-danger text-white border-danger hover:brightness-110": variant === "danger",
        },
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      disabled={disabled}
      {...rest}
    >
      <Icon size={12} />
      <span>{text}</span>
    </button>
  );
}
