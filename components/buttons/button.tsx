import clsx from "clsx";

type Button = React.ComponentProps<"button"> & {
  text: string;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg" | "full";
};

export default function Button({ text, onClick, className, variant = "primary", size = "full", ...rest }: Button) {
  className = clsx(
    "min-w-[120px]",
    "flex items-center justify-center",
    "rounded-full",
    "font-semibold",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    {
      "w-full py-2": size === "full",
      "w-[80%] py-2": size === "lg",
      "w-[60%] py-2": size === "md",
      "w-[50%] py-1": size === "sm",
    },
    {
      "bg-primary text-main-inverted border-[1px] border-primary": variant === "primary",
      "bg-secondary text-primary border-[1px] border-primary": variant === "secondary",
      "bg-danger text-white border-[1px] border-danger": variant === "danger",
    },
    className
  );
  return (
    <button onClick={onClick} className={className} {...rest}>
      {text}
    </button>
  );
}
