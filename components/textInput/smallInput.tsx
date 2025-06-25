import clsx from "clsx";

type SmallInput = {
  errorMessage?: string;
  icon?: React.ReactNode;
  infoIcon?: boolean;
  infoText?: string;
  hasLabel?: boolean;
  labelText?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

export default function SmallInput({
  type = "text",
  className,
  placeholder,
  name,
  value,
  onChange,
  disabled,
  hasLabel = false,
  labelText,
  ...props
}: SmallInput) {
  const inputClassName = clsx(
    "min-w-[100px] w-full max-w-[105px] h-[32px] px-3 rounded-xl",
    "bg-white border outline-none",
    "placeholder:text-primary placeholder:italic placeholder:opacity-80",
    "text-primary text-base font-medium",
    "transition-all duration-200 ease-in-out",
    className
  );

  return (
    <div className={clsx("relative flex flex-col gap-1 mb-4 mt-2", {})}>
      {hasLabel && <span className="text-xs font-semibold">{labelText}</span>}
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
      </div>
    </div>
  );
}
