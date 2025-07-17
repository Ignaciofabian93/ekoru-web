import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
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

export default function NavDropDown({ title, items, disabled }: DropdownProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [openPath, setOpenPath] = useState<number[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpened) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpened(false);
        setOpenPath([]);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpened]);

  // Recursive render for nested items, showing only the branch from openPath
  const renderItems = (items: DropdownItem[], level = 0, parentIds: number[] = []) => {
    // Determine the "View All" link for this level
    let viewAllHref = "#";
    if (level === 0 && items.length > 0 && items[0].href) {
      // Extract the first segment (e.g., /market or /stores)
      const match = items[0].href.match(/^\/(\w+)/);
      if (match) {
        viewAllHref = `/${match[1]}`;
      }
    } else if (level === 1 && parentIds.length > 0) {
      viewAllHref = `/market/department/${parentIds[0]}/department-category`;
    } else if (level === 2 && parentIds.length > 1) {
      viewAllHref = `/market/department/${parentIds[0]}/department-category/${parentIds[1]}/product-category`;
    }

    return (
      <ul
        className={clsx(
          "bg-white shadow-lg px-4 py-2 flex flex-col gap-2 z-50 min-w-[250px]",
          level === 0 ? "absolute left-0 top-0 rounded-b-lg" : "absolute left-full top-0"
        )}
      >
        {items.map((item, idx) => {
          const isOpen = openPath[level] === idx;
          // Extract ids for building the next level's parentIds
          const currentIds = [...parentIds];
          if (level === 0 && item.href) {
            // /browse/department/[id]
            const match = item.href.match(/\/market\/department\/(\d+)/);
            if (match) currentIds.push(Number(match[1]));
          }
          if (level === 1 && item.href) {
            // /browse/department/[id]/department-category/[catId]
            const match = item.href.match(/department-category\/(\d+)/);
            if (match) currentIds.push(Number(match[1]));
          }
          return (
            <li key={item.label} className="relative group">
              {item.children ? (
                <AnimatePresence>
                  <div className="w-full flex items-center justify-between">
                    <a
                      href={item.href || "#"}
                      className={clsx(
                        "w-full text-left px-2 py-1 hover:bg-primary hover:text-white transition-colors ease-in-out duration-200 rounded flex items-center cursor-pointer",
                        isOpen && "bg-primary text-white"
                      )}
                      type="button"
                      tabIndex={0}
                    >
                      {item.label}
                    </a>
                    <div className="flex items-center justify-center text-primary-dark">
                      <ChevronRight
                        onClick={() => {
                          setOpenPath(
                            (prev) =>
                              isOpen
                                ? prev.slice(0, level) // close this branch
                                : [...prev.slice(0, level), idx] // open this branch
                          );
                        }}
                        className={clsx(
                          "transition-transform duration-300 ml-2 inline w-5 h-5 cursor-pointer ease-in-out",
                          {
                            "rotate-180": isOpen,
                          }
                        )}
                      />
                    </div>
                  </div>
                </AnimatePresence>
              ) : (
                <a
                  className="block px-2 py-1 hover:bg-primary hover:text-white rounded"
                  href={item.href || "#"}
                  tabIndex={0}
                  onClick={() => setIsOpened(false)}
                >
                  {item.label}
                </a>
              )}
              {/* Only render children if this is the open branch */}
              {item.children && isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-[calc(100%_+_16px)] -top-2"
                >
                  {renderItems(item.children, level + 1, currentIds)}
                </motion.div>
              )}
            </li>
          );
        })}
        {/* View All option */}
        <li>
          <a
            className="block px-2 py-1 font-semibold hover:bg-primary hover:text-white rounded"
            href={viewAllHref}
            tabIndex={0}
            onClick={() => setIsOpened(false)}
          >
            Ver todo
          </a>
        </li>
      </ul>
    );
  };

  return (
    <div ref={dropdownRef} className={clsx("relative transition-all ease-in-out duration-300 pl-2")}>
      <button
        className={clsx("flex items-center cursor-pointer", { "text-disabled": disabled })}
        type="button"
        onClick={() => {
          if (!disabled) {
            setIsOpened((v) => !v);
            setOpenPath([]); // reset path when opening/closing
          }
        }}
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
