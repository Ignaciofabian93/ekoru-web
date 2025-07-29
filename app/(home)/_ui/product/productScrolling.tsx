import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductScrolling({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="relative w-full">
      {/* Left/Right buttons only for web (hidden on mobile) */}
      <button
        className="hidden md:flex absolute -left-4 top-[35%] -translate-y-1/2 z-10 bg-primary/50 rounded-full p-2 shadow hover:bg-primary/90 transition-all duration-200 ease-in-out"
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        type="button"
      >
        <ChevronLeft className="text-white" />
      </button>
      <div
        ref={scrollRef}
        className="w-full flex overflow-x-auto gap-x-4 no-scrollbar md:no-scrollbar"
        style={{ scrollBehavior: "smooth" }}
      >
        {children}
      </div>
      <button
        className="hidden md:flex absolute -right-4 top-[35%] -translate-y-1/2 z-10 bg-primary/50 rounded-full p-2 shadow hover:bg-primary/90 transition-all duration-200 ease-in-out"
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        type="button"
      >
        <ChevronRight className="text-white" />
      </button>
    </div>
  );
}
