import { colors } from "@/constants/colors";
import clsx from "clsx";
import { Info } from "lucide-react";

type TextInput = {
  size?: "sm" | "md" | "lg" | "full";
  errorMessage?: string;
  icon?: React.ReactNode;
  infoIcon?: boolean;
  infoText?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

export default function TextInput({
  type,
  className,
  size = "full",
  placeholder,
  name,
  value,
  onChange,
  disabled,
  errorMessage,
  icon,
  infoIcon = false,
  infoText,
  ...props
}: TextInput) {
  const inputClassName = clsx(
    "min-w-[80px] h-12",
    "rounded-[11px]",
    "pl-4 pr-4",
    "bg-white",
    "text-primary",
    "text-semibold",
    "outline-none",
    "border-[1px]",
    "placeholder:text-primary placeholder:opacity-[0.8] placeholder:italic",
    {
      "border-primary": !errorMessage,
      "border-red-500": errorMessage,
      "pl-8": infoIcon,
      "w-1/3": size === "sm",
      "w-1/2": size === "md",
      "w-2/3": size === "lg",
      "w-full": size === "full",
    },
    className
  );

  return (
    <div
      className={clsx("rounded-[11px] flex flex-col items-start justify-center mb-4 mt-2 relative", {
        "w-1/3": size === "sm",
        "w-1/2": size === "md",
        "w-2/3": size === "lg",
        "w-full": size === "full",
      })}
    >
      <input
        type={type}
        placeholder={placeholder}
        className={inputClassName}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <div className={clsx("absolute right-4 cursor-pointer")}>{icon}</div>
      {errorMessage && (
        <span className="text-red-500 text-xs pl-1 mt-1 absolute left-0 -bottom-4 w-full">{errorMessage}</span>
      )}
      {infoIcon && (
        <div className="absolute left-2 cursor-pointer">
          <div className="relative group">
            <Info color={colors.primary} size={16} />
            {infoText && (
              <div className="absolute left-full bottom-0 ml-2 w-52 text-xs p-2 rounded bg-gray-100 text-gray-800 shadow-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-10 pointer-events-none">
                {infoText}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
