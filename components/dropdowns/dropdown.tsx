import { useState } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

type Dropdown = {
  title: string;
  items: string[];
  disabled?: boolean;
};

export default function DropDown({ title, items, disabled }: Dropdown) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  return (
    <div className={clsx("relative", "transition-all ease-in-out duration-300", "min-w-[100px]")}>
      <button
        className={clsx("flex", { "text-disabled": disabled })}
        type="button"
        onClick={() => (disabled ? null : setIsOpened(!isOpened))}
      >
        {title}
        <ChevronDown
          className={clsx("transition-transform duration-300 ml-2", {
            "rotate-180": isOpened,
          })}
        />
      </button>
      <ul
        className={clsx(
          "absolute left-0 top-full w-fit min-w-[200px]",
          "bg-slate-600 rounded-b-lg shadow-lg",
          "px-8 py-4",
          "flex flex-col gap-2",
          "overflow-hidden",
          "transition-all duration-300 ease-in-out",
          isOpened ? "max-h-[500px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
        )}
      >
        {items.map((item) => (
          <li key={item}>
            <a className="" href="#">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
