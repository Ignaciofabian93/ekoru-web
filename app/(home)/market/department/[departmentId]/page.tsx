"use client";
import { useParams } from "next/navigation";
import PageWrapper from "@/app/(home)/_ui/pageWrapper";
import ContentWrapper from "../../../_ui/catalog/contentWrapper";
import Banner from "@/ui/banner/banner";
import Pagination from "@/ui/pagination/pagination";
import wallpaper from "@/assets/images/market.jpg";
import PageHeader from "@/app/(home)/_ui/catalog/pageHeader";
import ProductsListing from "@/app/(home)/_ui/product/productsListing";
import useProductsByDepartment from "../../_hooks/useProductsByDepartment";
import RenderCircularOptions from "@/app/(home)/_ui/catalog/renderCircularOptions";

// This page is for displaying the results of browsing a specific department.
export default function BrowseDepartmentResultsPage() {
  const params = useParams();
  const departmentId = params?.departmentId;
  const {
    products,
    productsLoading,
    filteredProductList,
    selectedFilters,
    brands,
    locations,
    minPrice,
    maxPrice,
    badges,
    onFilterChange,
  } = useProductsByDepartment({
    id: Number(departmentId),
  });

  console.log("Products in department:", products);

  const circularOptionsData = products.map((product) => ({
    id: product.productCategory.departmentCategory.id,
    name: product.productCategory.departmentCategory.departmentCategoryName,
    href: `/market/department/${product.productCategory.departmentCategory.id}/department-category/${product.productCategory.departmentCategory.id}`,
  }));

  return (
    <PageWrapper>
      <PageHeader
        image={wallpaper}
        alt="Portada de departamento"
        message="Recicla, reutiliza y renueva"
      />
      <ContentWrapper>
        <Banner
          title={"Explora los departamentos"}
          description="Busca tus productos en el departamento seleccionado o sus categorías"
        />
      </ContentWrapper>
      <ContentWrapper>
        {productsLoading ? (
          <div className="flex justify-center items-center py-8">
            {/* You can use your Spinner component here if you have one */}
            <span>Cargando categorías...</span>
          </div>
        ) : (
          circularOptionsData &&
          circularOptionsData.length > 0 && (
            <RenderCircularOptions data={circularOptionsData} />
          )
        )}
      </ContentWrapper>
      <ContentWrapper>
        <ProductsListing
          products={filteredProductList}
          selectedFilters={selectedFilters}
          brands={brands as string[]}
          locations={locations as string[]}
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
