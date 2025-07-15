import { useRef } from "react";
import { Product } from "@/types/product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/cards/productCard";
import ProductsSkeleton from "../../_components/productsSkeleton";

type Props = {
  title: string;
  description: string;
  products: Product[];
  isLoading?: boolean;
};

export default function FeedProducts({ title, description, products, isLoading = false }: Props) {
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
    <section className="w-[95%] mt-8 mb-8 relative mx-auto backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-1 px-2">
        <h2 className="text-xl text-main font-semibold">{title}</h2>
      </div>
      <p className="text-main text-sm mb-4 px-2">{description}</p>
      {isLoading ? (
        <div className="relative w-full">
          <div className="w-full flex overflow-x-auto gap-x-4 pb-4 scrollbar-thin scrollbar-thumb-green-200">
            <ProductsSkeleton />
          </div>
        </div>
      ) : (
        products.length > 0 && (
          <div className="relative w-full">
            {/* Left/Right buttons only for web (hidden on mobile) */}
            <button
              className="hidden md:flex absolute -left-4 top-[45%] -translate-y-1/2 z-10 bg-primary/50 rounded-full p-2 shadow hover:bg-primary/90 transition-all duration-200 ease-in-out"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              type="button"
            >
              <ChevronLeft className="text-white" />
            </button>
            <div
              ref={scrollRef}
              className="w-full flex overflow-x-auto gap-x-4 pb-4 no-scrollbar md:no-scrollbar"
              style={{ scrollBehavior: "smooth" }}
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  images={product.images}
                  title={product.name}
                  sellerImage={product.user?.profileImage}
                  seller={product.user?.name || product.user?.businessName}
                  description={product.description}
                  price={product.price}
                  productCategory={product.productCategory}
                  location={`${product.user?.county.county}, ${product.user?.city.city}`}
                  isExchangeable={product.isExchangeable}
                  interests={product.interests}
                />
              ))}
            </div>
            <button
              className="hidden md:flex absolute -right-4 top-[45%] -translate-y-1/2 z-10 bg-primary/50 rounded-full p-2 shadow hover:bg-primary/90 transition-all duration-200 ease-in-out"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              type="button"
            >
              <ChevronRight className="text-white" />
            </button>
          </div>
        )
      )}
      {!isLoading && products.length === 0 && (
        <p className="px-2 text-gray-500">No hay productos disponibles en este momento.</p>
      )}
    </section>
  );
}
