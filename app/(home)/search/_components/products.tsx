"use client";
import ProductCard from "@/components/cards/productCard";
import useSearch from "@/app/(home)/search/_hooks/useSearch";

export default function ProductResults() {
  const { products } = useSearch();

  if (!products.length) return null;

  return (
    <section>
      <div className="max-w-7xl mx-auto w-[90%] px-4 py-8">
        <div className="w-full flex flex-wrap gap-4 items-center justify-center">
          {products.map((product) => (
            <ProductCard
              id={product.id}
              key={product.id}
              seller={product.user?.name}
              sellerImage={product.user?.profileImage}
              title={product.name}
              description={product.description}
              price={product.price}
              images={product.images}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
