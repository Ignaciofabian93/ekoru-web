import Navbar from "@/components/navigation/Navbar";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-start">
      <Navbar />
      <div className="w-full h-full mt-8">{children}</div>
    </main>
  );
}
