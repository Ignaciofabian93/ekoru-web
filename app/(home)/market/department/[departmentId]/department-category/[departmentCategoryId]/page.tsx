"use client";
import PageWrapper from "@/app/(home)/_components/pageWrapper";
import ContentWrapper from "@/app/(home)/market/_components/contentWrapper";
import MarketHeader from "@/app/(home)/market/_components/header";
import useBrowse from "@/hooks/useBrowse";
import clsx from "clsx";

export default function BrowseDepartmentCategoryPage() {
  const { selectedDepartmentCategory, departmentCategories } = useBrowse();
  console.log("Selected Department Category:", selectedDepartmentCategory);

  return (
    <PageWrapper>
      <MarketHeader />
      <ContentWrapper>
        <h2 className="text-lg font-semibold mb-2 text-green-800">Departamentos</h2>
        <div className="flex overflow-x-auto gap-4 pb-2">
          {departmentCategories?.map((dept) => (
            <button
              key={dept.id}
              className={clsx(
                "min-w-[160px] px-6 py-4 rounded-xl shadow bg-white border-2 transition-all",
                selectedDepartmentCategory?.id === dept.id
                  ? "border-green-600 bg-green-50 text-green-900"
                  : "border-transparent hover:border-green-300 hover:bg-green-50"
              )}
            >
              <span className="font-medium">{dept.departmentCategoryName}</span>
            </button>
          ))}
        </div>
      </ContentWrapper>
      <ContentWrapper>
        {selectedDepartmentCategory && selectedDepartmentCategory.productCategories.length > 0 ? (
          <>
            <h3 className="text-md font-semibold mb-3 text-green-700">Categorías</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedDepartmentCategory.productCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-lg shadow p-4 hover:bg-green-50 transition cursor-pointer"
                >
                  <span className="font-medium text-green-800">{cat.productCategoryName}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-gray-500 text-center py-12">
            <span>
              {departmentCategories?.length
                ? "Selecciona un departamento para ver sus categorías."
                : "Cargando departamentos..."}
            </span>
          </div>
        )}
      </ContentWrapper>
    </PageWrapper>
  );
}
