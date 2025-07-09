import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import Button from "../buttons/button";

type Modal = {
  title: string;
  children: React.ReactNode;
  className?: string;
  close?: () => void;
  isOpen?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function Modal({ title, children, close, isOpen = true, size = "lg" }: Modal) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={clsx("fixed inset-0 z-[9999]", "flex items-center justify-center", "bg-black/50 backdrop-blur-sm")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.article
            className={clsx(
              {
                "sm:w-[90%] sm:max-w-[500px]": size === "sm",
                "md:w-[90%] md:max-w-[700px]": size === "md",
                "lg:w-[90%] lg:max-w-[900px]": size === "lg",
              },
              "max-h-[95%]",
              "bg-white border border-primary shadow-xl rounded-[20px]",
              "px-6 py-5",
              "flex flex-col justify-between overflow-y-auto no-scrollbar",
              "transform transition-all duration-300"
            )}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">{title}</h3>
            <div className="flex-1">{children}</div>
            <div className="w-full flex justify-center mt-4">
              <Button text="Cerrar" variant="secondary" onClick={close} />
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
