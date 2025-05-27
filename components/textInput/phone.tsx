import clsx from "clsx";

type PhoneInputProps = {
  value?: string;
  name: string;
  size?: "sm" | "md" | "lg" | "full";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  disabled?: boolean;
};

export default function PhoneInput({ value, name, size, onChange, errorMessage, disabled }: PhoneInputProps) {
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

  const containerClass = clsx(
    "flex items-center gap-2",
    getSize(),
    "h-12 rounded-[11px] px-2",
    "bg-white border-[1px]",
    {
      "border-primary": !errorMessage,
      "border-red-500": errorMessage,
    },
    "mt-2 mb-4 relative"
  );

  const inputClass = clsx(
    "flex-1 h-full outline-none bg-transparent text-primary text-semibold px-2",
    "placeholder:italic placeholder:text-primary placeholder:opacity-80"
  );

  return (
    <div className={containerClass}>
      <select disabled className="text-primary bg-transparent outline-none px-2 cursor-not-allowed" value="+56">
        <option value="+56">+56</option>
      </select>
      <input
        type="tel"
        name={name}
        value={value}
        onChange={onChange}
        className={inputClass}
        placeholder="9 1234 5678"
        disabled={disabled}
      />
      {errorMessage && (
        <span className="text-red-500 text-xs pl-1 mt-1 absolute left-0 -bottom-4 w-full">{errorMessage}</span>
      )}
    </div>
  );
}
