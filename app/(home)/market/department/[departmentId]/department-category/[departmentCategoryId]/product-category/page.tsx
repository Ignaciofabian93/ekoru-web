"use client";
import { RenderCategories } from "@/app/(home)/_components/categoriesRow";
import { ProductCategory } from "@/types/product";
import PageWrapper from "@/app/(home)/_components/pageWrapper";
import ProductsListing from "@/app/(home)/_components/productsListing";
import ContentWrapper from "@/app/(home)/market/_components/contentWrapper";
import MarketHeader from "@/app/(home)/market/_components/header";
import useProductCategories from "@/app/(home)/market/_hooks/useProductCategory";
import Banner from "@/components/banner/banner";
import Pagination from "@/components/pagination/pagination";

// This page is for browsing product categories in a department category.
export default function BrowseProductCategoriesPage() {
  const {
    productCategoriesLoading,
    productCategories,
    redirectToProductCategorySelected,
    selectedProductCategory,
    selectProductCategory,
    filteredProductList,
    selectedFilters,
    brands,
    locations,
    minPrice,
    maxPrice,
    badges,
    onFilterChange,
  } = useProductCategories();

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
        <RenderCategories
          moduleName="Subcategorías"
          data={productCategories}
          isLoading={productCategoriesLoading}
          redirect={(e) => redirectToProductCategorySelected(e)}
          selectedObject={selectedProductCategory}
          selectObject={(e) => selectProductCategory(e as ProductCategory)}
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
