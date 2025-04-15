import SearchIcon from "@/assets/icons/search";
import clsx from "clsx";

export default function SearchInput() {
  return (
    <div
      className={clsx("w-full max-w-[50%] h-[41px]", "rounded-[20.5px] bg-white flex items-center justify-start pl-4")}
    >
      <SearchIcon />
      <input
        type="search"
        placeholder="Buscar en EKORU"
        className={clsx("w-full h-full rounded-[20.5px] text-[20px] font-[400] px-4", "outline-none", "text-[#aaa]")}
      />
    </div>
  );
}
