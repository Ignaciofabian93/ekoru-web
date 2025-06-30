"use client";
import PageWrapper from "@/app/(home)/_components/pageWrapper";
import ProductsListing from "@/app/(home)/_components/productsListing";
import ContentWrapper from "@/app/(home)/market/_components/contentWrapper";
import MarketHeader from "@/app/(home)/market/_components/header";
import useProductCategories from "@/app/(home)/market/_hooks/useProductCategory";
import Banner from "@/components/banner/banner";
import Pagination from "@/components/pagination/pagination";

// This page is used to display the results of browsing a specific product category
export default function BrowseProductCategoryResultsPage() {
  const {
    productCategoriesLoading,
    filteredProductList,
    selectedFilters,
    brands,
    locations,
    minPrice,
    maxPrice,
    badges,
    onFilterChange,
  } = useProductCategories();
  //
  return (
    <PageWrapper>
      <MarketHeader />
      <ContentWrapper>
        <Banner
          isLoading={productCategoriesLoading}
          title="Encuentra tus productos favoritos"
          description="Explora las categorías de productos"
        />
      </ContentWrapper>
      <ContentWrapper>
        <ProductsListing
          products={filteredProductList}
          selectedFilters={selectedFilters}
          brands={brands}
          locations={locations}
          minPrice={minPrice}
          maxPrice={maxPrice}
          badges={badges}
          onFilterChange={onFilterChange}
        />
      </ContentWrapper>
      <div className="w-full mt-20">
        <Pagination currentPage={1} totalPages={20} onPageChange={() => {}} />
      </div>
    </PageWrapper>
  );
}
