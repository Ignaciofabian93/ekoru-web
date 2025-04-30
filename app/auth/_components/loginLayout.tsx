import clsx from "clsx";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={clsx(
        "w-screen h-screen",
        "flex flex-col md:flex-row items-center justify-center",
        "p-2",
        "gap-[16px]"
      )}
    >
      {children}
    </main>
  );
}
