import React, { useMemo, useState } from "react";
import ProductCard from "@/components/cards/productCard";
import { type Badge } from "@/types/enums";
import { Product } from "@/types/product";
import BadgeTag from "@/components/badges/badge";
import ProductFilters from "./filters";

type ProductsList = {
  products?: Product[];
  filters?: React.ReactNode;
};

export default function ProductsListing({ products = [], filters }: ProductsList) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-6 w-full h-full mx-auto">
      <ProductFilters products={products} onFilterChange={(filters) => console.log("Filters changed:", filters)} />
      <div className="w-full sm:w-[60%] lg:w-[75%] xl:w-[80%] mx-auto">
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.name}
                description={product.description}
                seller={`${product.user?.name} ${product.user?.surnames}`}
                sellerImage={product.user?.profileImage}
                location={`${product.user?.county.county}, ${product.user?.city.city}`}
                price={product.price}
                images={product.images}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-10">No hay productos para mostrar.</p>
        )}
      </div>
    </div>
  );
}
