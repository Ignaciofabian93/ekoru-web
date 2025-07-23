import { useState, useRef } from "react";
import { Product } from "@/types/product";
import clsx from "clsx";
import ProductCard from "@/components/cards/product/productCard";
import useMyProductsStore from "@/store/myProducts";
import Spinner from "@/components/spinner/spinner";

export default function MyProductsList({ products }: { products: Product[] }) {
  const { myProductsLoading } = useMyProductsStore();
  const [search, setSearch] = useState("");
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
  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()) ||
      product.brand?.toLowerCase().includes(search.toLowerCase()) ||
      product.productCategory.keywords.some((keyword) => keyword.toLowerCase().includes(search.toLowerCase()))
  );

  if (myProductsLoading) {
    return (
      <section className="w-full min-h-[400px] flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </section>
    );
  }

  return (
    <section className="w-full">
      <p className="mb-2 text-main">Selecciona un producto para intercambiar.</p>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar producto..."
        aria-label="Buscar producto"
        className={clsx(
          "h-12 px-4 pr-10 rounded-xl",
          "bg-white border outline-none",
          "placeholder:text-primary placeholder:italic placeholder:opacity-80",
          "text-primary text-base font-medium",
          "transition-all duration-200 ease-in-out",
          "border-primary focus:ring-2 focus:ring-primary/30",
          "mb-4"
        )}
      />
      {filteredProducts?.length > 0 ? (
        <div className="relative w-full">
          {/* Left/Right buttons only for web (hidden on mobile) */}
          <button
            className="hidden md:flex absolute -left-4 top-[45%] -translate-y-1/2 z-10 bg-primary/50 rounded-full p-2 shadow hover:bg-primary/90 transition-all duration-200 ease-in-out"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            type="button"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                d="M15 6l-6 6 6 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div
            ref={scrollRef}
            className={clsx("flex overflow-x-auto gap-4 py-4 no-scrollbar")}
            style={{ scrollBehavior: "smooth" }}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                images={
                  product.images && product.images.length > 0 ? product.images : ["/products_cover.jpg"]
                }
                title={product.name}
                description={product.description}
                isExchangeable={product.isExchangeable}
                isSharedEnabled={false}
                isFavoriteEnabled={false}
                isSelectionButtonEnabled={true}
                location={`${product.user?.county.county}, ${product.user?.city.city}`}
                productCategory={product.productCategory}
                seller={product.user?.name || "Vendedor Anónimo"}
                sellerImage={product.user?.profileImage || "/brandIcon.webp"}
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
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                d="M9 6l6 6-6 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mb-2 text-primary">
            <path
              fill="currentColor"
              d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
            />
          </svg>
          <p className="text-main text-center">No tienes productos para intercambiar.</p>
        </div>
      )}
    </section>
  );
}
