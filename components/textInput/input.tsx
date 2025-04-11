import clsx from "clsx";

type TextInput = React.ComponentProps<"input">;

export default function TextInput({ type, className, ...rest }: TextInput) {
  className = clsx(
    "min-w-[80px] w-full h-12",
    "rounded-[11px]",
    "px-4 mb-2 mt-2",
    "bg-white",
    "text-primary",
    "text-semibold",
    "placeholder:text-[#f7f7f7]",
    "outline-none",
    "border-[1px] border-primary",
    "placeholder:text-primary placeholder:opacity-[0.5] placeholder:italic",
    className,
  );
  return <input type={type} className={className} {...rest} />;
}
