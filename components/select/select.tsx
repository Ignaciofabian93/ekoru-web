import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

type Option = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options?: Option[];
  className?: string;
  value?: string | number;
  name: string;
  size?: "sm" | "md" | "lg" | "full";
  onChange: (value: string | number) => void;
  label: string;
  disabled?: boolean;
};

export default function CustomSelect({
  className,
  value,
  options = [],
  size = "full",
  onChange,
  label,
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label || label;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()));

  const sizeClass = {
    sm: "w-1/3",
    md: "w-1/2",
    lg: "w-2/3",
    full: "w-full",
  }[size];

  return (
    <div className={clsx("relative", sizeClass)} ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "h-12 w-full text-left rounded-[11px] px-4 pr-10 mb-4 mt-2",
          "bg-white border border-primary text-base text-primary font-semibold",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {selectedLabel}
        <ChevronDown
          size={18}
          className={clsx(
            "absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Modal */}
      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-primary rounded-xl shadow-lg animate-fade-in-down">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full px-4 py-2 border-b border-primary outline-none text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={clsx(
                    "px-4 py-2 cursor-pointer hover:bg-primary/10",
                    option.value === value && "bg-primary/10 font-semibold"
                  )}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-500 italic">No se encuentran resultados</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
