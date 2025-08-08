"use client";
import { RenderCategories } from "@/app/(home)/_ui/categoriesRow";
import { ProductCategory } from "@/types/product";
import PageWrapper from "@/app/(home)/_ui/pageWrapper";
import ContentWrapper from "@/app/(home)/_ui/catalog/contentWrapper";
import useProductCategories from "@/app/(home)/market/_hooks/useProductCategory";
import Banner from "@/ui/banner/banner";
import wallpaper from "@/assets/images/market.jpg";
import PageHeader from "@/app/(home)/_ui/catalog/pageHeader";
import ProductsListing from "@/app/(home)/_ui/product/productsListing";
import { ChevronRight } from "lucide-react";

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
      <PageHeader
        image={wallpaper}
        alt="Portada de categoría"
        message="Encuentra los mejores productos en cada categoría"
      />
      <ContentWrapper>
        <Banner
          isLoading={productCategoriesLoading}
          title="Encuentra tus productos favoritos"
          description="Explora las categorías de productos"
          variant="accented"
        />
      </ContentWrapper>
      <ContentWrapper>
        <div className="flex items-center gap-2 mb-6">
          <ChevronRight className="text-primary" size={20} />
          <span className="text-xl font-semibold text-main">Subcategorías</span>
        </div>
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
    </PageWrapper>
  );
}
