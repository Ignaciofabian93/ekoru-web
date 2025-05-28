import clsx from "clsx";

type PhoneInputProps = {
  value?: string;
  name: string;
  size?: "sm" | "md" | "lg" | "full";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  disabled?: boolean;
  hasLabel?: boolean;
  labelText?: string;
};

export default function PhoneInput({
  value,
  name,
  size = "full",
  onChange,
  errorMessage,
  disabled,
  hasLabel = false,
  labelText,
}: PhoneInputProps) {
  const containerClass = clsx(
    "relative flex items-center gap-1 px-3 h-12 rounded-xl",
    "border transition-all duration-200 bg-white",
    {
      "border-primary focus-within:ring-2 focus-within:ring-primary/30": !errorMessage,
      "border-red-500 focus-within:ring-2 focus-within:ring-red-300": errorMessage,
      "opacity-50 cursor-not-allowed": disabled,
    },
    {
      "w-1/3": size === "sm",
      "w-1/2": size === "md",
      "w-2/3": size === "lg",
      "w-full": size === "full",
    }
  );

  const inputClass = clsx(
    "flex-1 h-full px-2 outline-none bg-transparent",
    "text-primary text-sm font-medium",
    "placeholder:italic placeholder:text-primary placeholder:opacity-80"
  );

  return (
    <div className="w-full flex flex-col justify-center gap-1 mt-2 mb-4">
      {hasLabel && <span className="text-[14px] font-semibold">{labelText}</span>}
      <div className={containerClass}>
        {/* Country code (non-editable) */}
        <select
          disabled
          className="text-primary bg-transparent outline-none text-sm font-medium cursor-not-allowed"
          value="+56"
        >
          <option value="+56">+56</option>
        </select>

        {/* Phone input */}
        <input
          type="tel"
          name={name}
          value={value}
          onChange={onChange}
          placeholder="9 1234 5678"
          disabled={disabled}
          className={inputClass}
        />

        {/* Error Message */}
        {errorMessage && (
          <span className="absolute left-0 -bottom-4 text-xs text-red-500 pl-1 w-full">{errorMessage}</span>
        )}
      </div>
    </div>
  );
}
