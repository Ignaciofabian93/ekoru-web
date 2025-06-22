import { motion } from "framer-motion";
import { DepartmentCategory, ProductCategory } from "@/types/product";
import clsx from "clsx";

type RenderProductCategoriesProps = {
  selectedDepartmentCategory: DepartmentCategory | null;
  selectedProductCategory: ProductCategory | null;
  handleProductCategorySelect: (category: ProductCategory) => void;
  redirectToProductCategory: (departmentId: number, categoryId: number, productCategoryId: number) => void;
};

export const RenderProductCategories = ({
  selectedDepartmentCategory,
  selectedProductCategory,
  handleProductCategorySelect,
  redirectToProductCategory,
}: RenderProductCategoriesProps) => {
  return (
    <>
      <div
        className={clsx(
          // Horizontal scroll on mobile, grid on sm+
          "flex overflow-x-auto gap-4 pb-2 -mx-2 px-2",
          "sm:grid sm:grid-cols-2 md:grid-cols-4 sm:gap-6 sm:overflow-visible sm:px-0 sm:mx-0"
        )}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {selectedDepartmentCategory?.productCategories?.map((cat) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              handleProductCategorySelect(cat);
            }}
            transition={{ duration: 0.2 }}
            className={clsx(
              "flex flex-col items-start min-w-[70vw] max-w-[90vw] sm:min-w-0 sm:max-w-none",
              "p-5",
              "rounded-xl shadow-md",
              "border border-lime-100",
              "transition cursor-pointer",
              "hover:bg-lime-50",
              {
                "bg-lime-50 border-lime-200": selectedProductCategory?.id === cat.id,
                "bg-white": selectedProductCategory?.id !== cat.id,
              }
            )}
          >
            <span className="font-semibold text-primary-dark text-left w-full text-base">
              {cat.productCategoryName}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                redirectToProductCategory(
                  selectedDepartmentCategory?.departmentId,
                  selectedDepartmentCategory.id,
                  cat.id
                );
              }}
              className="mt-2 text-sm text-primary-dark underline"
            >
              Ver más
            </button>
          </motion.div>
        ))}
      </div>
      {!selectedDepartmentCategory && (
        <div className="text-left text-main">Selecciona una categoría para ver sub categorías.</div>
      )}
    </>
  );
};
