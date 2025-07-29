export default function ContentWrapper({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-[1200px] h-fit mx-auto">{children}</div>;
}
