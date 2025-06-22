"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { RenderDepartments } from "./_ui/renderDepartments";
import { Department, DepartmentCategory, ProductCategory } from "@/types/product";
import { DepartmentSkeleton } from "../_components/skeletons";
import { RenderDepartmentCategories } from "./_ui/renderDepartmentCategories";
import { RenderProductCategories } from "./_ui/renderProductCategories";
import { RenderProducts } from "./_ui/renderProducts";
import PageWrapper from "../../_components/pageWrapper";
import BrowseHeader from "../_components/header";
import ContentWrapper from "../_components/contentWrapper";
import useDepartments from "../_hooks/useDepartment";
import Banner from "@/components/banner/banner";
import useDepartmentCategories from "../_hooks/useDepartmentCategory";
import useProductCategories from "../_hooks/useProductCategory";

export default function BrowseDepartmentsPage() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { departments, selectedDepartment, departmentsLoading, selectDepartment } = useDepartments();
  const { selectedDepartmentCategory, selectDepartmentCategory } = useDepartmentCategories();
  const { selectedProductCategory, selectProductCategory } = useProductCategories();

  const redirectToDepartment = (departmentId: number) => {
    router.push(`/market/department/${departmentId}`);
  };

  const redirectToDepartmentCategory = (departmentId: number, categoryId: number) => {
    router.push(`/market/department/${departmentId}/department-category/${categoryId}`);
  };

  const redirectToProductCategory = (departmentId: number, categoryId: number, productCategoryId: number) => {
    router.push(
      `/market/department/${departmentId}/department-category/${categoryId}/product-category/${productCategoryId}`
    );
  };

  const handleDepartmentSelect = (dept: Department) => {
    const scrollLeft = scrollRef.current?.scrollLeft ?? 0;
    selectDepartment(dept);
    selectDepartmentCategory({} as DepartmentCategory); // Reset category selection when changing department
    selectProductCategory({} as ProductCategory); // Reset product category selection when changing department
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollLeft;
      }
    }, 0);
  };

  const handleDepartmentCategorySelect = (category: DepartmentCategory) => {
    selectDepartmentCategory(category);
    selectProductCategory({} as ProductCategory); // Reset product category selection when changing department category
  };

  const handleProductCategorySelect = (category: ProductCategory) => {
    selectProductCategory(category);
  };

  const blockClassName = "mb-8 p-6 rounded-xl border border-gray-200 bg-white shadow-sm transition-all";

  return (
    <PageWrapper>
      <BrowseHeader />
      <ContentWrapper>
        <Banner
          title="Explora los departamentos"
          description="Encuentra tus productos dentro de tus categorías favoritas y dales una nueva vida"
        />
      </ContentWrapper>
      <ContentWrapper>
        <section className="mb-8 p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-main flex items-center gap-2">
            <ChevronRight className="text-primary" size={20} />
            Departamentos
          </h2>
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-4 px-2 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent"
          >
            {departmentsLoading ? (
              Array.from({ length: 10 }).map((_, i) => <DepartmentSkeleton key={i} />)
            ) : (
              <RenderDepartments
                departments={departments}
                selectedDepartment={selectedDepartment}
                handleDepartmentSelect={handleDepartmentSelect}
                redirectToDepartment={redirectToDepartment}
              />
            )}
          </div>
        </section>
      </ContentWrapper>
      <ContentWrapper>
        <section className={blockClassName}>
          <h3 className="text-lg font-semibold mb-4 text-main flex items-center gap-2">
            <ChevronRight className="text-primary" size={20} />
            Categorías
          </h3>
          <div>
            <RenderDepartmentCategories
              selectedDepartment={selectedDepartment}
              selectedDepartmentCategory={selectedDepartmentCategory}
              handleDepartmentCategorySelect={handleDepartmentCategorySelect}
              redirectToDepartmentCategory={redirectToDepartmentCategory}
            />
          </div>
        </section>
      </ContentWrapper>
      <ContentWrapper>
        <section className={blockClassName}>
          <h3 className="text-lg font-semibold mb-4 text-main flex items-center gap-2">
            <ChevronRight className="text-primary" size={20} />
            Sub Categorías
          </h3>
          <RenderProductCategories
            selectedDepartmentCategory={selectedDepartmentCategory}
            selectedProductCategory={selectedProductCategory}
            handleProductCategorySelect={handleProductCategorySelect}
            redirectToProductCategory={redirectToProductCategory}
          />
        </section>
      </ContentWrapper>
      <ContentWrapper>
        <section className={blockClassName}>
          <h3 className="text-lg font-semibold mb-4 text-main flex items-center gap-2">
            <ChevronRight className="text-primary" size={20} />
            Productos
          </h3>
          <RenderProducts
            selectedDepartmentCategory={selectedDepartmentCategory}
            selectedProductCategory={selectedProductCategory}
          />
        </section>
      </ContentWrapper>
    </PageWrapper>
  );
}
