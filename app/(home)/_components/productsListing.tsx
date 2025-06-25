import { Product } from "@/types/product";
import ProductFilters, { FilterProps } from "./filters";
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
}: ProductsList) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-6 w-full h-full mx-auto">
      <ProductFilters
        onFilterChange={(filters) => console.log("Filters changed:", filters)}
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
