"use client";
import { RenderCategories } from "@/app/(home)/_ui/categoriesRow";
import { DepartmentCategory } from "@/types/product";
import PageWrapper from "@/app/(home)/_ui/pageWrapper";
import ContentWrapper from "../../../../_ui/catalog/contentWrapper";
import Banner from "@/ui/banner/banner";
import useDepartmentCategories from "../../../_hooks/useDepartmentCategory";
import wallpaper from "@/assets/images/market.jpg";
import PageHeader from "@/app/(home)/_ui/catalog/pageHeader";
import ProductsListing from "@/app/(home)/_ui/product/productsListing";
import { ChevronRight } from "lucide-react";

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
        message="Encuentra los mejores productos en cada categoría"
      />
      <ContentWrapper>
        <Banner
          isLoading={departmentCategoriesLoading}
          title="Encuentra tus productos favoritos"
          description="Explora las categorías de productos"
          variant="accented"
        />
      </ContentWrapper>
      <ContentWrapper>
        <div className="flex items-center gap-2 mb-6">
          <ChevronRight className="text-primary" size={20} />
          <span className="text-xl font-semibold text-main">Categorías</span>
        </div>
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
    </PageWrapper>
  );
}
