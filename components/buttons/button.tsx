import clsx from "clsx";

type Button = React.ComponentProps<"button"> & {
  text: string;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg" | "full";
};

export default function Button({ text, onClick, className, variant = "primary", size = "full", ...rest }: Button) {
  className = clsx(
    "h-10",
    "flex items-center justify-center",
    "mb-2 mt-2",
    "rounded-[11px]",
    "font-bold",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    {
      "w-full": size === "full",
      "w-[80%]": size === "lg",
      "w-[60%]": size === "md",
      "w-[40%]": size === "sm",
    },
    {
      "bg-primary text-[#f7f7f7] border-[1px] border-primary": variant === "primary",
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
