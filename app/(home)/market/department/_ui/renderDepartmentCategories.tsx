import { motion } from "framer-motion";
import { Department, DepartmentCategory } from "@/types/product";
import clsx from "clsx";

type RenderDepartmentCategoriesProps = {
  selectedDepartment: Department | null;
  selectedDepartmentCategory: DepartmentCategory | null;
  handleDepartmentCategorySelect: (category: DepartmentCategory) => void;
  redirectToDepartmentCategory: (departmentId: number, categoryId: number) => void;
};
export const RenderDepartmentCategories = ({
  selectedDepartment,
  selectedDepartmentCategory,
  handleDepartmentCategorySelect,
  redirectToDepartmentCategory,
}: RenderDepartmentCategoriesProps) => {
  return (
    <>
      <div
        className={clsx(
          // Use horizontal scroll on mobile, grid on md+
          "flex overflow-x-auto gap-4 pb-2 -mx-2 px-2",
          "sm:grid sm:grid-cols-2 md:grid-cols-4 sm:gap-6 sm:overflow-visible sm:px-0 sm:mx-0"
        )}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {selectedDepartment?.departmentCategories?.map((cat) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              handleDepartmentCategorySelect(cat);
            }}
            className={clsx(
              "flex flex-col items-start min-w-[70vw] max-w-[90vw] sm:min-w-0 sm:max-w-none",
              "p-5",
              "rounded-xl shadow-md",
              "border border-lime-100",
              "transition cursor-pointer",
              "hover:bg-lime-50",
              {
                "bg-lime-50 border-lime-200": selectedDepartmentCategory?.id === cat.id,
                "bg-white": selectedDepartmentCategory?.id !== cat.id,
              }
            )}
          >
            <span className="font-semibold text-primary-dark text-left w-full text-base">
              {cat.departmentCategoryName}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                redirectToDepartmentCategory(selectedDepartmentCategory?.departmentId as number, cat.id);
              }}
              className="mt-2 text-sm text-primary-dark underline"
            >
              Ver más
            </button>
          </motion.div>
        ))}
      </div>
      {!selectedDepartment && (
        <div className="text-left text-main">Selecciona un departamento para ver sus categorías.</div>
      )}
    </>
  );
};
