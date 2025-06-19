"use client";
import PageWrapper from "@/app/(home)/_components/pageWrapper";
import BrowseHeader from "../../../_components/header";
import useDepartmentCategories from "../../../_hooks/useDepartmentCategory";

export default function BrowseDepartmentCategoriesPage() {
  const {
    departmentCategories,
    departmentCategoryLoading,
    departmentCategoriesLoading,
    selectedDepartmentCategory,
    selectDepartmentCategory,
    breadcrumbs,
  } = useDepartmentCategories();
  return (
    <PageWrapper>
      <BrowseHeader />

      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold mb-4">Categoria de departamentos, vista general</h1>
        <p className="text-gray-600">This is where the browse results will be displayed.</p>
      </div>
    </PageWrapper>
  );
}
