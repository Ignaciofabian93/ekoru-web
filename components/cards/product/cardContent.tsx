export default function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-full lg:h-[50%] flex flex-col items-center justify-between pb-3">{children}</div>;
}
