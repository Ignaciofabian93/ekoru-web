import clsx from "clsx";

type DateInputProps = {
  className?: string;
  value?: string;
  name: string;
  size?: "sm" | "md" | "lg" | "full";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  errorMessage?: string;
  disabled?: boolean;
};

export default function DateInput({
  className,
  value,
  name,
  size,
  onChange,
  label = "Seleccionar fecha",
  errorMessage,
  disabled,
}: DateInputProps) {
  const getSize = () => {
    switch (size) {
      case "sm":
        return "w-1/3";
      case "md":
        return "w-1/2";
      case "lg":
        return "w-2/3";
      case "full":
        return "w-full";
      default:
        return "w-full";
    }
  };

  const inputClassName = clsx(
    "min-w-[80px] h-12",
    getSize(),
    "rounded-[11px]",
    "px-4",
    "bg-white",
    "text-primary",
    "text-semibold",
    "outline-none",
    "border-[1px]",
    {
      "border-primary": !errorMessage,
      "border-red-500": errorMessage,
    },
    "placeholder:text-primary placeholder:opacity-[0.8] placeholder:italic",
    className
  );

  return (
    <div className={clsx(getSize(), "flex flex-col items-start justify-center mt-2 mb-4 relative")}>
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        className={inputClassName}
        disabled={disabled}
        placeholder={label}
      />
      {errorMessage && (
        <span className="text-red-500 text-xs pl-1 mt-1 absolute left-0 -bottom-4 w-full">{errorMessage}</span>
      )}
    </div>
  );
}
