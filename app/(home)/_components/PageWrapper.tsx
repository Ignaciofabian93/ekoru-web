import Navbar from "@/components/navigation/Navbar";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-full flex flex-col items-center justify-start">
      <Navbar />
      <div className="w-full h-full mt-4">{children}</div>
    </main>
  );
}
