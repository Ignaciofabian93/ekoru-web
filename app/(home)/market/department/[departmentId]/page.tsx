"use client";
import { RenderDepartmentCategories } from "../_ui/renderDepartmentCategories";
import PageWrapper from "@/app/(home)/_components/pageWrapper";
import MarketHeader from "../../_components/header";
import ContentWrapper from "../../_components/contentWrapper";
import Banner from "@/components/banner/banner";
import Pagination from "@/components/pagination/pagination";
import ProductsListing from "../../../_components/productsListing";
import useDepartments from "../../_hooks/useDepartment";

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
        <RenderDepartmentCategories />
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
