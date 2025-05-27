import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Select = {
  options?: { label: string; value: string | number }[];
  className?: string;
  value?: string | number | undefined;
  name: string;
  size?: "sm" | "md" | "lg" | "full";
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  disabled?: boolean;
};

export default function Select({
  className,
  value,
  options,
  name,
  size = "full",
  onChange,
  label,
  disabled = false,
}: Select) {
  const [isFocused, setIsFocused] = useState(false);

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "w-1/3";
      case "md":
        return "w-1/2";
      case "lg":
        return "w-2/3";
      case "full":
      default:
        return "w-full";
    }
  };

  const baseStyles = clsx(
    "appearance-none",
    "min-w-[80px] h-12",
    "rounded-[11px]",
    "px-4 pr-10 mb-4 mt-2", // add space on the right for icon
    "bg-white",
    "text-primary",
    "text-semibold",
    "outline-none",
    "border-[1px]",
    disabled ? "border-gray-300 cursor-not-allowed opacity-50" : "border-primary",
    "placeholder:text-primary placeholder:opacity-[0.8] placeholder:italic",
    getSizeClass(),
    className
  );

  className = clsx(
    "min-w-[80px] h-12",
    "rounded-[11px]",
    "px-4 mb-4 mt-2",
    "bg-white",
    "text-primary",
    "text-semibold",
    "outline-none",
    "border-[1px] border-primary",
    "placeholder:text-primary placeholder:opacity-[0.8] placeholder:italic",
    {
      "w-1/3": size === "sm",
      "w-1/2": size === "md",
      "w-2/3": size === "lg",
      "w-full": size === "full",
      "cursor-not-allowed": disabled,
      "opacity-50": disabled,
    },
    className
  );
  return (
    <div className={clsx("relative", getSizeClass())}>
      <select
        disabled={disabled}
        className={baseStyles}
        value={value}
        name={name}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <option value="">{label}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Custom caret icon */}
      <ChevronDown
        size={18}
        className={clsx(
          "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none transition-transform duration-200",
          isFocused && "rotate-180 text-primary",
          !isFocused && "text-primary/70"
        )}
      />
    </div>
  );
}
