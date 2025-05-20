"use client";
import clsx from "clsx";
import DropDown from "../dropdowns/dropdown";
import Button from "../buttons/button";

export default function SubNavigation() {
  return (
    <div
      className={clsx(
        "hidden md:flex w-full h-[40px] px-4",
        "bg-white text-sm font-normal",
        "text-[16px]",
        "transition-all ease-in-out duration-300"
      )}
    >
      <div
        className={clsx("max-w-[1600px] mx-auto w-full h-full", "flex items-center justify-start gap-4", "px-4 py-4")}
      >
        <DropDown title="Mercado" items={["Categoría 1", "Categoría 2"]} />
        <DropDown title="Tiendas" items={["Categoría 1", "Categoría 2"]} />
        <DropDown title="Servicios" items={["Categoría 1", "Categoría 2"]} disabled />
        <DropDown title="Comunidad" items={["Categoría 1", "Categoría 2"]} disabled />
        <DropDown title="Cultura" items={["Categoría 1", "Categoría 2"]} disabled />
      </div>
      <div className="flex items-center justify-center">
        <Button text="Vender" onClick={() => {}} size="sm" />
      </div>
    </div>
  );
}
