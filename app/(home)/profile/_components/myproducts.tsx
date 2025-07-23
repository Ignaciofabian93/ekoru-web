"use client";
import clsx from "clsx";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useProfile from "../_hooks/useProfile";
import ProductCard from "@/components/cards/product/productCard";
import ProductsSkeleton from "../../_components/productsSkeleton";
import Banner from "@/components/banner/banner";

export default function MyProducts() {
  const { myProducts, myProductsLoading } = useProfile();
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
    <div
      className={clsx("w-full min-h-[400px] flex flex-col items-center justify-start", "mx-auto px-4 mb-8")}
    >
      <Banner title="Mis Productos" description="Aquí puedes ver y gestionar tus productos." />
      {myProductsLoading ? (
        <div className="relative w-full">
          <div className="w-full flex overflow-x-auto gap-x-4 pb-4 no-scrollbar">
            <ProductsSkeleton />
          </div>
        </div>
      ) : (
        myProducts.length > 0 && (
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
              className="w-full flex overflow-x-auto gap-x-4 pb-4 no-scrollbar md:no-scrollbar items-center justify-start mt-4 px-1 py-4"
              style={{ scrollBehavior: "smooth" }}
            >
              {myProducts.map((product) => (
                <ProductCard
                  id={product.id}
                  key={product.id}
                  title={product.name}
                  images={product.images}
                  price={product.price}
                  seller={product.user?.name?.split(" ")[0]}
                  interests={product.interests}
                  isExchangeable={product.isExchangeable}
                  badges={product.badges}
                  isFavoriteEnabled={false}
                  isSharedEnabled={true}
                  isSelectionButtonEnabled={false}
                  productCategory={product.productCategory}
                  sellerImage={product.user?.profileImage}
                  description={product.description}
                  location={`${product.user?.county?.county}, ${product.user?.city?.city}`}
                  isCTAClickEnabled={false}
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
      {!myProductsLoading && myProducts.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-[18px] font-semibold">No tienes productos</p>
        </div>
      )}
    </div>
  );
}
