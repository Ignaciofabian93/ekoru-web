import clsx from "clsx";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <section className={clsx("w-full h-3/4 flex flex-col items-center justify-start p-4 md:justify-center")}>
      {children}
    </section>
  );
}
