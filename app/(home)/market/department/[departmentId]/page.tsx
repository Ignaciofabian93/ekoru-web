"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { DepartmentSkeleton } from "../../_components/skeletons";
import { RenderDepartmentCategories } from "../_ui/renderDepartmentCategories";
import { Department, DepartmentCategory, Product } from "@/types/product";
import PageWrapper from "@/app/(home)/_components/pageWrapper";
import MarketHeader from "../../_components/header";
import ContentWrapper from "../../_components/contentWrapper";
import Banner from "@/components/banner/banner";
import useDepartments from "../../_hooks/useDepartment";
import Pagination from "@/components/pagination/pagination";
import useDepartmentCategories from "../../_hooks/useDepartmentCategory";
import ProductsListing from "../../../_components/productsListing";

// This page is for displaying the results of browsing a specific department.
export default function BrowseDepartmentResultsPage() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { selectedDepartment } = useDepartments();
  const { selectedDepartmentCategory, selectDepartmentCategory } = useDepartmentCategories();

  function getProductsList() {
    const productsByDepartment: Product[] = [];
    const productsByDepartmentCategory: Product[] = [];

    if (!selectedDepartmentCategory) {
      // If no department category is selected, return whole products by department
      selectedDepartment?.departmentCategories.forEach((cat) => {
        cat.productCategories.forEach((prodCategory) => {
          prodCategory.products.forEach((product) => {
            productsByDepartment.push(product);
          });
        });
      });

      return productsByDepartment;
    } else {
      // If a department category is selected, return products by that category
      selectedDepartmentCategory.productCategories.forEach((prodCategory) => {
        prodCategory.products.forEach((product) => {
          productsByDepartmentCategory.push(product);
        });
      });

      return productsByDepartmentCategory;
    }
  }

  const productsList = getProductsList();
  console.log("Products list:", productsList);

  const redirectToDepartmentCategory = (departmentId: number) => {
    router.push(`/market/department/${departmentId}`);
  };

  const handleDepartmentCategorySelect = (dept: DepartmentCategory) => {
    const scrollLeft = scrollRef.current?.scrollLeft ?? 0;
    selectDepartmentCategory(dept);
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollLeft;
      }
    }, 0);
  };
  return (
    <PageWrapper>
      <MarketHeader />
      <ContentWrapper>
        <Banner title={selectedDepartment?.departmentName as string} description="Busca tus productos aquí" />
      </ContentWrapper>
      <ContentWrapper>
        <section className="mb-8 mt-10">
          <h2 className="text-xl font-semibold mb-4 text-main flex items-center gap-2">
            <ChevronRight className="text-primary" size={20} />
            Categorías
          </h2>
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-6 px-2 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent"
          >
            {false ? (
              Array.from({ length: 10 }).map((_, i) => <DepartmentSkeleton key={i} />)
            ) : (
              <RenderDepartmentCategories
                selectedDepartment={selectedDepartment}
                selectedDepartmentCategory={selectedDepartmentCategory}
                handleDepartmentCategorySelect={handleDepartmentCategorySelect}
                redirectToDepartmentCategory={redirectToDepartmentCategory}
              />
            )}
          </div>
        </section>
      </ContentWrapper>
      <ContentWrapper>
        <ProductsListing products={productsList} />
      </ContentWrapper>
      <Pagination currentPage={1} totalPages={20} onPageChange={() => {}} />
    </PageWrapper>
  );
}
