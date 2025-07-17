"use client";
import ContentWrapper from "../_components/contentWrapper";
import Banner from "@/components/banner/banner";
import PageWrapper from "../_components/pageWrapper";
import ProductsListing from "../_components/productsListing";
import Pagination from "@/components/pagination/pagination";
import useSearch from "./_hooks/useSearch";
import PageHeader from "../_components/pageHeader";
import wallpaper from "@/assets/images/community.jpg";

export default function SearchResultsPage() {
  const { filteredProductList, selectedFilters, brands, locations, minPrice, maxPrice, badges, onFilterChange } =
    useSearch();
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
