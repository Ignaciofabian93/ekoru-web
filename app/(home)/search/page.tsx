"use client";
import ContentWrapper from "../_ui/contentWrapper";
import Banner from "@/ui/banner/banner";
import PageWrapper from "../_ui/pageWrapper";
import ProductsListing from "../_ui/productsListing";
import Pagination from "@/ui/pagination/pagination";
import useSearch from "./_hooks/useSearch";
import PageHeader from "../_ui/pageHeader";
import wallpaper from "@/assets/images/community.jpg";

export default function SearchResultsPage() {
  const {
    filteredProductList,
    selectedFilters,
    brands,
    locations,
    minPrice,
    maxPrice,
    badges,
    onFilterChange,
  } = useSearch();
  return (
    <PageWrapper>
      <PageHeader
        image={wallpaper}
        alt="imagen de portada para resultados"
        message="Explora, encuentra y obtén productos sostenibles"
      />
      <ContentWrapper>
        <Banner title="Resultados de búsqueda" description="Explora los productos encontrados" />
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
