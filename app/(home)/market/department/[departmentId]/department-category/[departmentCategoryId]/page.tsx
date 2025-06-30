"use client";
import PageWrapper from "@/app/(home)/_components/pageWrapper";
import ProductsListing from "@/app/(home)/_components/productsListing";
import ContentWrapper from "@/app/(home)/market/_components/contentWrapper";
import MarketHeader from "@/app/(home)/market/_components/header";
import useDepartmentCategories from "@/app/(home)/market/_hooks/useDepartmentCategory";
import Banner from "@/components/banner/banner";
import Pagination from "@/components/pagination/pagination";
import { RenderCategories } from "@/app/(home)/_components/categoriesRow";

// This page is for browsing a specific department category in a specific department.
export default function BrowseDepartmentCategoryPage() {
  const {
    filteredProductList,
    selectedFilters,
    brands,
    locations,
    maxPrice,
    minPrice,
    badges,
    onFilterChange,
    selectedDepartmentCategory,
  } = useDepartmentCategories();

  return (
    <PageWrapper>
      <MarketHeader />
      <ContentWrapper>
        <Banner
          title={selectedDepartmentCategory?.departmentCategoryName as string}
          description="Encuentra todos tus favoritos aquí"
        />
      </ContentWrapper>
      <ContentWrapper>
        <RenderCategories
          moduleName="Subcategorías"
          data={selectedDepartmentCategory ? selectedDepartmentCategory.productCategories : []}
          isLoading={false}
          redirect={() => {}}
          selectObject={() => {}}
          selectedObject={null}
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
