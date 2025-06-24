import { Badge } from "@/types/enums";
import { Product } from "@/types/product";
import { useState, useMemo, useEffect } from "react";
import Slider from "@/components/slider/slider";
import BadgeTag from "@/components/badges/badge";

type FilterProps = {
  products: Product[];
  onFilterChange: (filters: {
    brands: string[];
    price: [number, number];
    rating: number | null;
    location: string | null;
    badges: Badge[];
  }) => void;
};

export default function ProductFilters({ products, onFilterChange }: FilterProps) {
  console.log("Products:", products);

  // Extract unique brands, locations, and price range from products
  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand).filter(Boolean))), [products]);
  console.log("Brands:", brands);
  const locations = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .map((p) =>
              p.user?.county?.county && p.user?.city?.city ? `${p.user.county.county}, ${p.user.city.city}` : null
            )
            .filter(Boolean)
        )
      ),
    [products]
  );
  console.log("Locations:", locations);

  const minProductPrice = useMemo(() => Math.min(...products.map((p) => p.price)), [products]);
  const maxProductPrice = useMemo(() => Math.max(...products.map((p) => p.price)), [products]);
  const badgeCounts = useMemo(() => {
    const counts: Record<Badge, number> = {} as Record<Badge, number>;
    products.forEach((product) => {
      (product.badges || []).forEach((badge: Badge) => {
        counts[badge] = (counts[badge] || 0) + 1;
      });
    });
    return counts;
  }, [products]);

  // State
  const [brandSelected, setBrandSelected] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([minProductPrice, maxProductPrice]);
  const [rating, setRating] = useState<number | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);

  // Notify parent on filter change
  // (optional, for future use)
  // useEffect(() => {
  //   onFilterChange?.({ brands: brandSelected, price, rating, location, badges });
  // }, [brandSelected, price, rating, location, badges, onFilterChange]);

  return (
    <section className="w-full sm:w-[40%] md:w-[33.3%] lg:w-[25%] xl:w-[20%] h-full mb-4">
      <div className="bg-white rounded-lg shadow p-4 mb-4 md:mb-0">
        <h2 className="font-semibold mb-2">Filtros</h2>
        {/* Brand filter */}
        <div className="mb-4">
          <label className="block text-xs font-medium mb-1">Marca</label>
          <div className="flex flex-col gap-1">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={brandSelected.includes(brand)}
                  onChange={() =>
                    setBrandSelected((prev) =>
                      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
                    )
                  }
                />
                {brand}
              </label>
            ))}
          </div>
        </div>
        {/* Price filter */}
        <div className="mb-4">
          <label className="block text-xs font-medium mb-1">Precio</label>
          <Slider min={minProductPrice} max={maxProductPrice} step={10} value={price} onChange={setPrice} />
        </div>
        <div className="mb-4">
          <label className="block text-xs font-medium mb-1">Ubicación</label>
          <select
            className="w-full text-xs rounded border-gray-200"
            value={location || ""}
            onChange={(e) => setLocation(e.target.value === "" ? null : e.target.value)}
          >
            <option value="">Todas</option>
            {locations.map((loc) => (
              <option key={loc} value={loc?.toString()}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        {/* Badge filter */}
        <div className="mb-2">
          <label className="block text-xs font-medium mb-1">Etiquetas</label>
          <div className="flex flex-col w-full items-start gap-2">
            {Object.entries(badgeCounts).map(([badge, count]) => (
              <div key={badge} className="flex items-center w-full">
                <BadgeTag
                  type={badge as Badge}
                  selected={badges.includes(badge as Badge)}
                  onClick={() =>
                    setBadges((prev) =>
                      prev.includes(badge as Badge) ? prev.filter((b) => b !== badge) : [...prev, badge as Badge]
                    )
                  }
                />
                <span className="ml-1 text-xs font-medium">({count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
