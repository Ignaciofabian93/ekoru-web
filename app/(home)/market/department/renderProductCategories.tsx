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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
              "rounded-xl shadow-md p-5 hover:bg-lime-50 transition cursor-pointer flex flex-col items-start border border-lime-100",
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
                  selectedProductCategory?.id as number
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
