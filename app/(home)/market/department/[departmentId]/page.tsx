"use client";
import { RenderCategories } from "@/app/(home)/_components/categoriesRow";
import { DepartmentCategory } from "@/types/product";
import PageWrapper from "@/app/(home)/_components/pageWrapper";
import MarketHeader from "../../_components/header";
import ContentWrapper from "../../../_components/contentWrapper";
import Banner from "@/components/banner/banner";
import Pagination from "@/components/pagination/pagination";
import ProductsListing from "../../../_components/productsListing";
import useDepartments from "../../_hooks/useDepartment";
import useDepartmentCategories from "../../_hooks/useDepartmentCategory";

// This page is for displaying the results of browsing a specific department.
export default function BrowseDepartmentResultsPage() {
  const {
    selectedDepartment,
    brands,
    locations,
    minPrice,
    maxPrice,
    badges,
    selectedFilters,
    onFilterChange,
    filteredProductList,
    departmentLoading,
  } = useDepartments();
  const { selectedDepartmentCategory, selectDepartmentCategory, redirectToDepartmentCategorySelected } =
    useDepartmentCategories();

  return (
    <PageWrapper>
      <MarketHeader />
      <ContentWrapper>
        <Banner
          isLoading={departmentLoading}
          title={selectedDepartment?.departmentName as string}
          description="Busca tus productos aquí"
        />
      </ContentWrapper>
      <ContentWrapper>
        <RenderCategories
          moduleName="Categorías"
          data={selectedDepartment ? selectedDepartment.departmentCategories : []}
          selectObject={(e) => selectDepartmentCategory(e as DepartmentCategory)}
          selectedObject={selectedDepartmentCategory}
          redirect={(e) => redirectToDepartmentCategorySelected(e)}
          isLoading={departmentLoading}
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
