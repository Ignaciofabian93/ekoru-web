"use client";
import { RenderCategories } from "@/app/(home)/_ui/categoriesRow";
import { ProductCategory } from "@/types/product";
import PageWrapper from "@/app/(home)/_ui/pageWrapper";
import ContentWrapper from "@/app/(home)/_ui/catalog/contentWrapper";
import useDepartmentCategories from "@/app/(home)/market/_hooks/useDepartmentCategory";
import useProductCategories from "@/app/(home)/market/_hooks/useProductCategory";
import Banner from "@/ui/banner/banner";
import wallpaper from "@/assets/images/market.jpg";
import PageHeader from "@/app/(home)/_ui/catalog/pageHeader";
import ProductsListing from "@/app/(home)/_ui/product/productsListing";

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
    departmentCategoryLoading,
    redirectToProductCategorySelected,
  } = useDepartmentCategories();
  const { selectProductCategory, selectedProductCategory } = useProductCategories();

  return (
    <PageWrapper>
      <PageHeader
        image={wallpaper}
        alt="Portada de categoría"
        message="Encuentra los mejores productos en cada categoría"
      />
      <ContentWrapper>
        <Banner
          isLoading={departmentCategoryLoading}
          title={selectedDepartmentCategory?.departmentCategoryName || "Categoría"}
          description="Encuentra todos tus favoritos aquí"
          variant="accented"
        />
      </ContentWrapper>
      <ContentWrapper>
        <RenderCategories
          moduleName="Subcategorías"
          data={
            selectedDepartmentCategory ? selectedDepartmentCategory.productCategories : []
          }
          isLoading={departmentCategoryLoading}
          redirect={(e) => redirectToProductCategorySelected(e)}
          selectObject={(e) => selectProductCategory(e as ProductCategory)}
          selectedObject={selectedProductCategory}
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
