"use client";
import useSearch from "@/app/(home)/search/_hooks/useSearch";

export default function ProductCategoryResults() {
  const { productCategories, handleProductCategorySelect } = useSearch();

  if (!productCategories || productCategories.length === 0) return null;

  return (
    <section className="w-full overflow-x-auto py-4">
      <div className="flex gap-3 w-max px-4">
        {productCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleProductCategorySelect(category)}
            className="px-4 py-2 rounded-full bg-primary text-white whitespace-nowrap hover:bg-primary/80 transition"
          >
            {category.productCategoryName}
          </button>
        ))}
      </div>
    </section>
  );
}
