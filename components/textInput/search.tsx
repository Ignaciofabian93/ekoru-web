import { Search } from "lucide-react";
import clsx from "clsx";

export default function SearchInput() {
  return (
    <div
      className={clsx(
        "w-full max-w-[700px] h-[38px]",
        "rounded-[20.5px] bg-white flex items-center justify-start pl-4",
        "md:mx-2"
      )}
    >
      <Search size={20} color="#aaa" />
      <input
        type="search"
        placeholder="Buscar en EKORU"
        className={clsx(
          "w-full h-full rounded-[20.5px] text-[20px] font-[400] px-2",
          "outline-none",
          "text-placeholder"
        )}
      />
    </div>
  );
}
