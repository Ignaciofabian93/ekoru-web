import { Product } from "@/types/product";
import ProductFilters from "./filters";
import ProductsGrid from "./productsGrid";

type ProductsList = {
  products?: Product[];
  filters?: React.ReactNode;
};

export default function ProductsListing({ products = [], filters }: ProductsList) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-6 w-full h-full mx-auto">
      <ProductFilters products={products} onFilterChange={(filters) => console.log("Filters changed:", filters)} />
      <ProductsGrid products={products} />
    </div>
  );
}
