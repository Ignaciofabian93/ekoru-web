import Footer from "@/ui/footer/footer";
import Navbar from "@/ui/navigation/navbar";
import SubNavigation from "@/ui/navigation/subNavigation";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-full flex flex-col items-center justify-start">
      <Navbar />
      <div className="w-full h-full mt-[80px]">
        <SubNavigation />
        <div className="w-full max-w-[1300px] h-fit mx-auto">{children}</div>
        <Footer />
      </div>
    </main>
  );
}
