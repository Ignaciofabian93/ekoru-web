import clsx from "clsx";

type Select = {
  options?: { label: string; value: string | number }[];
  className?: string;
  value?: string | number | undefined;
  name: string;
  size?: "sm" | "md" | "lg" | "full";
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
};

export default function Select({ className, value, options, name, size, onChange, label }: Select) {
  const getSize = () => {
    switch (size) {
      case "sm":
        return "w-1/2";
      case "md":
        return "w-1/3";
      case "lg":
        return "w-2/3";
      case "full":
        return "w-full";
      default:
        return "w-full";
    }
  };

  className = clsx(
    "min-w-[80px] h-12",
    `${getSize()}`,
    "rounded-[11px]",
    "px-4 mb-2 mt-2",
    "bg-white",
    "text-primary",
    "text-semibold",
    "placeholder:text-[#f7f7f7]",
    "outline-none",
    "border-[1px] border-primary",
    "placeholder:text-primary placeholder:opacity-[0.5] placeholder:italic",
    className
  );
  return (
    <select className={className} value={value} name={name} onChange={onChange}>
      <option value="">{label}</option>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
