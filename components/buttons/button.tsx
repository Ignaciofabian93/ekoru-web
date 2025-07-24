import clsx from "clsx";
import Spinner from "../spinner/spinner";

type Button = React.ComponentProps<"button"> & {
  text: string;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg" | "full";
  isLoading?: boolean;
};

export default function Button({
  text,
  onClick,
  className,
  variant = "primary",
  size = "full",
  isLoading = false,
  disabled = false,
  ...rest
}: Button) {
  className = clsx(
    "min-w-[100px] text-sm",
    "flex items-center justify-center",
    "rounded-full",
    "font-semibold",
    "cursor-pointer",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "transition-all duration-200",
    {
      "w-full py-2": size === "full",
      "w-[80%] py-2": size === "lg",
      "w-[60%] py-2": size === "md",
      "w-[50%] py-1": size === "sm",
      "h-[34px]": size === "sm" || size === "md",
      "h-[40px]": size === "lg" || size === "full",
      "hover:brightness-110": !disabled,
    },
    {
      "bg-primary text-main-inverted border-[1px] border-primary": variant === "primary",
      "bg-white text-primary border-[1px] border-primary": variant === "secondary",
      "bg-danger text-white border-[1px] border-danger": variant === "danger",
    },
    className
  );
  return (
    <button onClick={onClick} className={className} disabled={disabled} {...rest}>
      {isLoading ? <Spinner size={size} color={variant === "primary" ? "white" : "primary"} /> : text}
    </button>
  );
}
