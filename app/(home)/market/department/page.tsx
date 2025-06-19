"use client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ScanText, ChevronRight, CircleX } from "lucide-react";
import PageWrapper from "../../_components/pageWrapper";
import BrowseHeader from "../_components/header";
import clsx from "clsx";
import ContentWrapper from "../_components/contentWrapper";
import useDepartments from "../_hooks/useDepartment";

export default function BrowseDepartmentsPage() {
  const router = useRouter();
  const { departments, selectedDepartment, departmentsLoading, selectDepartment } = useDepartments();

  const navigateToDepartmentCategory = (departmentCategoryId: number) => {
    if (departmentCategoryId) {
      router.push(`/market/department/${selectedDepartment?.id}/department-category/${departmentCategoryId}`);
    }
  };

  function DepartmentSkeleton() {
    return (
      <div className="min-w-[170px] min-h-[170px] rounded-full bg-gradient-to-br from-green-100 to-green-200 animate-pulse flex flex-col items-center justify-center shadow-inner" />
    );
  }

  const RenderDepartments = () => {
    return (
      <div className="flex overflow-x-auto gap-6 py-4 px-2">
        {departments?.map((dept) => (
          <div
            key={dept.id}
            onClick={() => selectDepartment(dept)}
            className={clsx(
              "min-w-[170px] min-h-[170px] rounded-full shadow-lg bg-white border-2 transition-all flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-xl",
              selectedDepartment?.id === dept.id
                ? "border-primary-dark bg-green-50 text-primary-dark ring-1 ring-primary-dark"
                : "border-primary-light hover:border-primary"
            )}
          >
            <span className="font-semibold text-lg text-center w-full text-main">{dept.departmentName}</span>
            <button
              onClick={() => {
                router.push(`/market/department/${dept.id}`);
              }}
              className="mt-3 font-semibold text-sm text-primary-dark underline hover:brightness-125"
            >
              Ver más
            </button>
          </div>
        ))}
      </div>
    );
  };

  const RenderDepartmentCategories = () => {
    return (
      <div className="min-h-[340px] md:min-h-[400px] p-4 transition-all">
        <AnimatePresence initial={false}>
          {selectedDepartment && selectedDepartment.departmentCategories.length > 0 ? (
            <motion.div
              key={selectedDepartment.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-main flex items-center gap-2">
                <ChevronRight className="text-primary" size={20} />
                Categorías
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {selectedDepartment.departmentCategories.map((cat) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-xl shadow-md p-5 hover:bg-primary/20 transition cursor-pointer flex flex-col items-start border border-green-100"
                  >
                    <span className="font-semibold text-main text-left w-full text-base">
                      {cat.departmentCategoryName}
                    </span>
                    <button
                      onClick={() =>
                        router.push(`/market/department/${selectedDepartment.id}/department-category/${cat.id}`)
                      }
                      className="mt-2 text-sm text-primary-dark underline"
                    >
                      Ver más
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="no-categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-green-700 text-center py-16 flex flex-col items-center"
            >
              <CircleX className="text-primary-dark mb-4" size={40} />
              <span className="text-lg">
                {departments?.length
                  ? "Selecciona un departamento para ver sus categorías."
                  : "Cargando departamentos..."}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <PageWrapper>
      <BrowseHeader />
      <ContentWrapper>
        <h2 className="text-2xl font-semibold mb-2 text-main tracking-tight flex items-center gap-4">
          <ScanText className="text-primary" size={24} />
          Explorar Departamentos
        </h2>
        <p className="mb-8 text-lg text-main text-left">
          Selecciona un departamento para ver sus categorías y elige tus productos.
        </p>
      </ContentWrapper>
      <ContentWrapper>
        <h2 className="text-xl font-semibold mb-4 text-main flex items-center gap-2">
          <ChevronRight className="text-primary" size={20} />
          Departamentos
        </h2>
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent">
          {departmentsLoading ? (
            Array.from({ length: 10 }).map((_, i) => <DepartmentSkeleton key={i} />)
          ) : (
            <RenderDepartments />
          )}
        </div>
      </ContentWrapper>
      <ContentWrapper>
        <RenderDepartmentCategories />
      </ContentWrapper>
      {/* <ContentWrapper>
        <>
          <h3 className="text-md font-semibold mb-3 text-green-700">SubCategoría</h3>
        </>
      </ContentWrapper> */}
    </PageWrapper>
  );
}
