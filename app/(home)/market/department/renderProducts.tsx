import { motion } from "framer-motion";
import { DepartmentCategory, ProductCategory } from "@/types/product";
import ProductCard from "@/components/cards/productCard";

type RenderProductsProps = {
  selectedDepartmentCategory: DepartmentCategory | null;
  selectedProductCategory: ProductCategory | null;
};

export const RenderProducts = ({ selectedDepartmentCategory, selectedProductCategory }: RenderProductsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {selectedProductCategory &&
          selectedProductCategory?.products?.map((prod) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {}}
              transition={{ duration: 0.2 }}
            >
              <ProductCard title={prod.name} onClick={() => {}} />
            </motion.div>
          ))}
      </div>
      {!selectedProductCategory && (
        <div className="text-left text-main">Selecciona una sub categoría para ver sus productos.</div>
      )}
    </>
  );
};
