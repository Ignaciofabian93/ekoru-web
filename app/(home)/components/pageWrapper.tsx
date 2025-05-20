import Footer from "@/components/footer/footer";
import Navbar from "@/components/navigation/navbar";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-full flex flex-col items-center justify-start">
      <Navbar />
      <div className="w-full max-w-[1600px] h-full mt-[80px]">{children}</div>
      <Footer />
    </main>
  );
}
