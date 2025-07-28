import { useState, useRef, useEffect } from "react";
import { ChevronDown, Circle } from "lucide-react";
import clsx from "clsx";

type Option = {
  label: string;
  value: string | number;
  iconColor?: string;
};

type SelectProps = {
  options?: Option[];
  className?: string;
  value?: string | number;
  name: string;
  size?: "sm" | "md" | "lg" | "full";
  onChange: (value: string | number) => void;
  disabled?: boolean;
  hasLabel?: boolean;
  labelText?: string;
  omitSpacing?: boolean;
  isRenderingColorIcon?: boolean;
  renderOption?: (option: Option, selected: boolean) => React.ReactNode; // extensibility
};

export default function CustomSelect({
  className,
  value,
  name,
  options = [],
  size = "full",
  onChange,
  labelText,
  hasLabel = false,
  disabled = false,
  omitSpacing = false,
  isRenderingColorIcon = false,
  renderOption,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = `${name}-listbox`;

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen, search]);

  const filteredOptions = options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()));

  const sizeClass = {
    sm: "w-1/3",
    md: "w-1/2",
    lg: "w-2/3",
    full: "w-full",
  }[size];

  // Helper to render label with color icon
  const renderLabel = (option?: Option) => (
    <span className="flex items-center gap-2">
      {isRenderingColorIcon && option?.iconColor && (
        <Circle
          size={18}
          style={{
            color: option.iconColor,
            fill: option.iconColor,
            borderColor: option.iconColor === "#FFFFFF" ? "#888" : option.iconColor,
          }}
          className={clsx("rounded-full", {
            border: option.iconColor === "#FFFFFF" ? "#888" : null,
          })}
        />
      )}
      {option?.label || "Seleccione"}
    </span>
  );

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }
    if (e.key === "ArrowDown") {
      setHighlightedIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((i) => Math.max(i - 1, 0));
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (filteredOptions[highlightedIndex]) {
        onChange(filteredOptions[highlightedIndex].value);
        setIsOpen(false);
        setSearch("");
      }
      e.preventDefault();
    } else if (e.key === "Escape") {
      setIsOpen(false);
      e.preventDefault();
    }
  };

  return (
    <div
      className={clsx(
        "relative flex flex-col gap-1",
        {
          "mb-4": !omitSpacing,
          "mt-2": !omitSpacing,
        },
        sizeClass
      )}
      ref={containerRef}
    >
      {hasLabel && (
        <span className="text-[14px] font-semibold" id={`${name}-label`}>
          {labelText}
        </span>
      )}
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-labelledby={hasLabel ? `${name}-label` : undefined}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={clsx(
          "h-12 w-full relative text-left rounded-[11px] px-4 pr-10",
          "bg-white border border-primary text-base text-primary font-semibold",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {renderLabel(selectedOption)}
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
        <div
          id={listboxId}
          role="listbox"
          aria-activedescendant={
            highlightedIndex >= 0 && filteredOptions[highlightedIndex]
              ? `${name}-option-${filteredOptions[highlightedIndex].value}`
              : undefined
          }
          tabIndex={-1}
          className="absolute top-full left-0 z-20 mt-1 w-full bg-white border border-primary rounded-xl shadow-lg animate-fade-in-down"
        >
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full px-4 py-2 border-b border-primary outline-none text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar opciones"
          />
          <ul className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, idx) => (
                <li
                  key={option.value}
                  id={`${name}-option-${option.value}`}
                  role="option"
                  aria-selected={option.value === value}
                  tabIndex={0}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={clsx(
                    "px-4 py-2 cursor-pointer hover:bg-primary/10 flex items-center gap-2",
                    option.value === value && "bg-primary/10 font-semibold",
                    highlightedIndex === idx && "bg-primary/20"
                  )}
                >
                  {renderOption ? renderOption(option, option.value === value) : renderLabel(option)}
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
