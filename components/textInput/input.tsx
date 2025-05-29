import clsx from "clsx";
import { Info } from "lucide-react";
import { colors } from "@/constants/colors";

type TextInput = {
  size?: "sm" | "md" | "lg" | "full";
  errorMessage?: string;
  icon?: React.ReactNode;
  infoIcon?: boolean;
  infoText?: string;
  hasLabel?: boolean;
  labelText?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

export default function TextInput({
  type = "text",
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
  hasLabel = false,
  labelText,
  ...props
}: TextInput) {
  const inputClassName = clsx(
    "h-12 px-4 pr-10 rounded-xl",
    "bg-white border outline-none",
    "placeholder:text-primary placeholder:italic placeholder:opacity-80",
    "text-primary text-base font-medium",
    "transition-all duration-200 ease-in-out",
    {
      "border-primary focus:ring-2 focus:ring-primary/30": !errorMessage,
      "border-red-500 focus:ring-2 focus:ring-red-300": !!errorMessage,
      "pl-10": infoIcon,
      "w-1/3": size === "sm",
      "w-1/2": size === "md",
      "w-2/3": size === "lg",
      "w-full": size === "full",
      "cursor-not-allowed opacity-50": disabled,
    },
    className
  );

  return (
    <div
      className={clsx("relative flex flex-col gap-1 mb-4 mt-2", {
        "w-1/3": size === "sm",
        "w-1/2": size === "md",
        "w-2/3": size === "lg",
        "w-full": size === "full",
      })}
    >
      {hasLabel && <span className="text-[14px] font-semibold">{labelText}</span>}
      {/* Input Field */}
      <div className="w-full relative">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={inputClassName}
          {...props}
        />

        {/* Right-side Icon */}
        {icon && <div className="absolute right-3 top-[50%] translate-y-[-50%] text-primary">{icon}</div>}

        {/* Left-side Info Icon with Tooltip */}
        {infoIcon && (
          <div className="absolute left-3 top-[50%] translate-y-[-50%] group cursor-pointer z-10">
            <Info size={16} color={colors.primary} />
            {infoText && (
              <div className="absolute left-full bottom-1 ml-2 w-52 text-xs p-2 rounded-xl bg-gray-100 text-gray-700 shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none">
                {infoText}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {errorMessage && <span className="text-red-500 text-xs mt-1 ml-1">{errorMessage}</span>}
    </div>
  );
}
