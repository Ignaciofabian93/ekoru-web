import clsx from "clsx";
import Button from "../buttons/button";

type Modal = {
  title: string;
  children: React.ReactNode;
  className?: string;
  close?: () => void;
};

export default function Modal({ title, children, close }: Modal) {
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 right-0 z-[9999]",
        "bg-black/80",
        "w-screen h-screen",
        "flex items-center justify-center"
      )}
    >
      <article
        className={clsx(
          "w-[90%] h-[90%]",
          "md:w-[60%]",
          "px-4 py-4 md:px-8 md:py-8",
          "bg-white",
          "rounded-[11px]",
          "shadow-md shadow-slate-950/40",
          "border-[1px] border-primary",
          "overflow-y-auto",
          "mx-auto",
          "flex flex-col justify-between",
          "no-scrollbar"
        )}
      >
        <h3 className="text-[24px] md:text-[28px] text-left ml-4 mt-2 font-semibold">{title}</h3>
        {children}
        <div className="w-full flex items-center justify-center mx-auto">
          <Button text="Cerrar" variant="secondary" onClick={close} />
        </div>
      </article>
    </div>
  );
}
