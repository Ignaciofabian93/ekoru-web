import clsx from "clsx";

type Button = React.ComponentProps<"button"> & {
  text: string;
  variant?: "primary" | "secondary";
};

export default function Button({ text, onClick, className, variant = "primary", ...rest }: Button) {
  className = clsx(
    "w-full h-10",
    "flex items-center justify-center",
    "mb-2 mt-2",
    "rounded-[11px]",
    "font-bold",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    {
      "bg-primary text-[#f7f7f7] border-[1px] border-primary": variant === "primary",
      "bg-secondary text-primary border-[1px] border-primary": variant === "secondary",
    },
    className,
  );
  return (
    <button onClick={onClick} className={className} {...rest}>
      {text}
    </button>
  );
}
