"use client";
import { RenderCategories } from "@/app/(home)/_ui/categoriesRow";
import { DepartmentCategory } from "@/types/product";
import PageWrapper from "@/app/(home)/_ui/pageWrapper";
import ContentWrapper from "../../../../_ui/catalog/contentWrapper";
import Banner from "@/ui/banner/banner";
import useDepartmentCategories from "../../../_hooks/useDepartmentCategory";
import Pagination from "@/ui/pagination/pagination";
import wallpaper from "@/assets/images/market.jpg";
import PageHeader from "@/app/(home)/_ui/catalog/pageHeader";
import ProductsListing from "@/app/(home)/_ui/product/productsListing";

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
      <PageHeader
        image={wallpaper}
        alt="Portada de categoría"
        message={selectedDepartmentCategory?.departmentCategoryName as string}
      />
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
