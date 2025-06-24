"use client";
import { RenderDepartmentCategories } from "../_ui/renderDepartmentCategories";
import PageWrapper from "@/app/(home)/_components/pageWrapper";
import MarketHeader from "../../_components/header";
import ContentWrapper from "../../_components/contentWrapper";
import Banner from "@/components/banner/banner";
import Pagination from "@/components/pagination/pagination";
import ProductsListing from "../../../_components/productsListing";
import useProductDisplay from "@/app/(home)/_hooks/useProductDisplay";
import useDepartments from "../../_hooks/useDepartment";

// This page is for displaying the results of browsing a specific department.
export default function BrowseDepartmentResultsPage() {
  const { productsList } = useProductDisplay();
  const { selectedDepartment } = useDepartments();

  return (
    <PageWrapper>
      <MarketHeader />
      <ContentWrapper>
        <Banner title={selectedDepartment?.departmentName as string} description="Busca tus productos aquí" />
      </ContentWrapper>
      <ContentWrapper>
        <RenderDepartmentCategories />
      </ContentWrapper>
      <ContentWrapper>
        <ProductsListing products={productsList} />
      </ContentWrapper>
      <div className="w-full mt-20">
        <Pagination currentPage={1} totalPages={20} onPageChange={() => {}} />
      </div>
    </PageWrapper>
  );
}
