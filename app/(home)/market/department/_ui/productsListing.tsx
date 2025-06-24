import React, { useMemo, useState } from "react";
import ProductCard from "@/components/cards/productCard";
import { type Badge } from "@/types/enums";
import { Product } from "@/types/product";
import BadgeTag from "@/components/badges/badge";

type ProductsList = {
  products?: Product[];
  filters?: React.ReactNode;
};

export default function ProductsListing({ products = [], filters }: ProductsList) {
  // Group and count badges
  const badgeCounts = useMemo(() => {
    const counts: Record<Badge, number> = {} as Record<Badge, number>;
    products.forEach((product) => {
      (product.badges || []).forEach((badge: Badge) => {
        counts[badge] = (counts[badge] || 0) + 1;
      });
    });
    return counts;
  }, [products]);

  // State for selected badge filter
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // Filter products by selected badge
  const filteredProducts = useMemo(() => {
    if (!selectedBadge) return products;
    return products.filter((product) => product.badges?.includes(selectedBadge));
  }, [products, selectedBadge]);

  return (
    <div className="flex flex-col sm:flex-row items-start gap-6 w-full h-full mx-auto">
      {/* Filters */}
      <div className="w-full sm:w-[40%] md:w-[33.3%] lg:w-[25%] xl:w-[20%] h-full mb-4">
        <div className="bg-white rounded-lg shadow p-4 mb-4 md:mb-0">
          <h2 className="font-semibold mb-2">Filtros</h2>
          {/* Custom filters can be added here */}
          {/* Badge filters */}
          <div className="flex flex-col w-full items-start gap-2 mb-4">
            {Object.entries(badgeCounts).map(([badge, count]) => (
              <div key={badge} className="flex items-center w-full">
                <BadgeTag
                  type={badge as Badge}
                  selected={selectedBadge === badge}
                  onClick={() => setSelectedBadge(selectedBadge === badge ? null : (badge as Badge))}
                />
                <span className="ml-1 text-xs font-medium">({count})</span>
              </div>
            ))}
          </div>
          {/* You can add more filters here */}
        </div>
      </div>
      {/* Products grid */}
      <div className="w-full sm:w-[60%] lg:w-[75%] xl:w-[80%] mx-auto">
        {filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center">
            {filteredProducts.map((product) => (
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
