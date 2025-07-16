"use client";
import { RenderCategories } from "@/app/(home)/_components/categoriesRow";
import { DepartmentCategory } from "@/types/product";
import PageWrapper from "@/app/(home)/_components/pageWrapper";
import MarketHeader from "../../../_components/header";
import ContentWrapper from "../../../../_components/contentWrapper";
import Banner from "@/components/banner/banner";
import useDepartmentCategories from "../../../_hooks/useDepartmentCategory";
import ProductsListing from "@/app/(home)/_components/productsListing";
import Pagination from "@/components/pagination/pagination";

// This page is for browsing department categories in a specific department.
export default function BrowseDepartmentCategoriesPage() {
  const {
    departmentCategoriesLoading,
    filteredProductList,
    selectedFilters,
    brands,
    locations,
    minPrice,
    maxPrice,
    badges,
    onFilterChange,
    departmentCategories,
    selectedDepartmentCategory,
    redirectToDepartmentCategorySelected,
    selectDepartmentCategory,
  } = useDepartmentCategories();

  return (
    <PageWrapper>
      <MarketHeader />
      <ContentWrapper>
        <Banner
          isLoading={departmentCategoriesLoading}
          title="Encuentra tus productos favoritos"
          description="Explora las categorías de productos"
        />
      </ContentWrapper>
      <ContentWrapper>
        <RenderCategories
          moduleName="Categorías"
          data={departmentCategories}
          isLoading={departmentCategoriesLoading}
          redirect={(e) => redirectToDepartmentCategorySelected(e)}
          selectedObject={selectedDepartmentCategory}
          selectObject={(e) => selectDepartmentCategory(e as DepartmentCategory)}
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
