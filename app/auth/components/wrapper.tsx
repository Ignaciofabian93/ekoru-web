import clsx from "clsx";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <section className={clsx("w-full h-full flex flex-col items-center justify-center p-4")}>{children}</section>;
}
