import PageWrapper from "../_components/pageWrapper";
import SearchHeader from "./_components/header";
import ProductCategoryResults from "./_components/productCategories";
import ProductResults from "./_components/products";

export default function SearchResultsPage() {
  return (
    <PageWrapper>
      <SearchHeader />
      <ProductCategoryResults />
      <ProductResults />
    </PageWrapper>
  );
}
