import { Loader2, Search as SearchIcon, X } from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";

type Search = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submit: (e: React.FormEvent) => void;
  loading?: boolean;
};

export default function SearchInput({ value, onChange, submit, loading }: Search) {
  // Handler to clear the input
  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    // Create a synthetic event to clear the input
    const event = {
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  return (
    <form onSubmit={submit} className="w-full max-w-[800px]">
      <div className={clsx("relative flex flex-col gap-1 w-full")}>
        <div className="w-full relative">
          <input
            type="search"
            placeholder="Buscar en EKORU"
            value={value}
            onChange={onChange}
            className={clsx(
              "w-full h-12 px-5 pr-10 rounded-full",
              "bg-white border outline-none",
              "placeholder:text-primary placeholder:italic placeholder:opacity-80",
              "text-primary text-base font-medium",
              "transition-all duration-200 ease-in-out"
            )}
          />
          {/* Right-side Icon */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
            {loading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="flex items-center justify-center"
              >
                <Loader2 size={20} color="#aaa" className="animate-spin" />
              </motion.span>
            ) : value ? (
              <X size={20} color="#aaa" className="cursor-pointer" onClick={handleClear} />
            ) : (
              <SearchIcon size={20} color="#aaa" />
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
