"use client";
import PageWrapper from "@/app/(home)/_ui/pageWrapper";
import ContentWrapper from "@/app/(home)/_ui/catalog/contentWrapper";
import useProductCategories from "@/app/(home)/market/_hooks/useProductCategory";
import Banner from "@/ui/banner/banner";
import Pagination from "@/ui/pagination/pagination";
import wallpaper from "@/assets/images/market.jpg";
import PageHeader from "@/app/(home)/_ui/catalog/pageHeader";
import ProductsListing from "@/app/(home)/_ui/product/productsListing";

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
      <PageHeader image={wallpaper} alt="Portada de categoría" message="Encuentra tus productos favoritos" />
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
