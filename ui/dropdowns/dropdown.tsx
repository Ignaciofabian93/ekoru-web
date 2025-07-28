import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export type DropdownItem = {
  label: string;
  href?: string;
  children?: DropdownItem[];
};

type DropdownProps = {
  title: string;
  items: DropdownItem[];
  disabled?: boolean;
};

export default function DropDown({ title, items, disabled }: DropdownProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpened) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpened(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpened]);

  // Recursive render for nested items, showing only the branch from openPath
  const renderItems = (items: DropdownItem[], level = 0) => {
    return (
      <ul
        className={clsx(
          "bg-white shadow-lg px-4 py-2 flex flex-col gap-2 z-50 min-w-[280px]",
          level === 0 ? "absolute left-0 top-0 rounded-b-lg" : "absolute left-full top-0"
        )}
      ></ul>
    );
  };

  return (
    <div ref={dropdownRef} className={clsx("relative transition-all ease-in-out duration-300 pl-2")}>
      <button
        className={clsx("flex items-center cursor-pointer", { "text-disabled": disabled })}
        type="button"
        tabIndex={0}
      >
        {title}
        <ChevronDown
          className={clsx("transition-transform duration-300 ml-2", {
            "rotate-180": isOpened,
          })}
        />
      </button>
      <div className={clsx("absolute -left-2 top-[32px] z-50", isOpened ? "block" : "hidden")}>
        <AnimatePresence>
          {isOpened && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              {renderItems(items)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
