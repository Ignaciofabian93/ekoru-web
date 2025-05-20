import clsx from "clsx";
import DropDown from "../dropdowns/dropdown";

export default function SubNavigation() {
  return (
    <div
      className={clsx(
        "hidden w-full h-[48px]",
        "bg-white text-sm font-normal",
        "text-[24px]",
        "transition-all ease-in-out duration-300"
      )}
    >
      <div
        className={clsx("max-w-[1600px] mx-auto w-full h-full", "flex items-center justify-start gap-8", "px-12 py-4")}
      >
        <DropDown title="Mercado" items={["Categoría 1", "Categoría 2"]} />
        <DropDown title="Tiendas" items={["Categoría 1", "Categoría 2"]} />
        <DropDown title="Servicios" items={["Categoría 1", "Categoría 2"]} />
      </div>
    </div>
  );
}
