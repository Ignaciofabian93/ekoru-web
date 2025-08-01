import { Product } from "@/types/product";
import ProductFilters, { FilterProps } from "../filters";
import ProductsGrid from "./productsGrid";

type ProductsList = FilterProps & {
  products: Product[];
};

export default function ProductsListing({
  products = [],
  selectedFilters,
  brands,
  locations,
  minPrice,
  maxPrice,
  badges,
  onFilterChange,
}: ProductsList) {
  return (
    <div className="flex flex-col md:flex-row items-start gap-6 w-full h-full mx-auto">
      <ProductFilters
        onFilterChange={onFilterChange}
        brands={brands}
        minPrice={minPrice}
        maxPrice={maxPrice}
        locations={locations}
        badges={badges}
        selectedFilters={selectedFilters}
      />
      <ProductsGrid products={products} />
    </div>
  );
}
