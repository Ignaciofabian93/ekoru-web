export default function ContentWrapper({ children }: { children: React.ReactNode }) {
  return <section className="w-[95%] mt-6 mx-auto">{children}</section>;
}
