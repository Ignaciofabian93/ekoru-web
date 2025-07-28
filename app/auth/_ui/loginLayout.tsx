import clsx from "clsx";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={clsx("max-w-[1000px] flex flex-col md:flex-row items-center justify-center", "gap-[8px] mx-auto")}>
      {children}
    </main>
  );
}
