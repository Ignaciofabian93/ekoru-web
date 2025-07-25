import { motion } from "framer-motion";
import { DepartmentCategory, ProductCategory } from "@/types/product";
import ProductCard from "@/components/cards/product/productCard";

type RenderProductsProps = {
  selectedDepartmentCategory: DepartmentCategory | null;
  selectedProductCategory: ProductCategory | null;
};

export const RenderProducts = ({
  // selectedDepartmentCategory,
  selectedProductCategory,
}: RenderProductsProps) => {
  return (
    <>
      <div
        className="
          flex overflow-x-auto gap-4 pb-2 -mx-2 px-2
          sm:grid sm:grid-cols-2 md:grid-cols-4 sm:gap-6 sm:overflow-visible sm:px-0 sm:mx-0
        "
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {selectedProductCategory &&
          selectedProductCategory?.products?.map((prod) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="
                flex-shrink-0 min-w-[70vw] max-w-[90vw]
                sm:min-w-0 sm:max-w-none
              "
            >
              <ProductCard
                id={prod.id}
                userId={prod.user?.id || ""}
                seller={`${prod.user?.name} ${prod.user?.surnames}`}
                sellerImage={prod.user?.profileImage}
                location={`${prod.user?.county.county}, ${prod.user?.city.city}`}
                title={prod.name}
                images={prod.images}
                description={prod.description}
                price={prod.price}
              />
            </motion.div>
          ))}
      </div>
      {!selectedProductCategory && (
        <div className="text-left text-main">Selecciona una sub categoría para ver sus productos.</div>
      )}
    </>
  );
};
