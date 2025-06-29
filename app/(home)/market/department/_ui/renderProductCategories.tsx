import { motion } from "framer-motion";
import { DepartmentCategory, ProductCategory } from "@/types/product";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import useDepartmentCategories from "../../_hooks/useDepartmentCategory";
import useProductCategories from "../../_hooks/useProductCategory";
import { DepartmentSkeleton } from "../../_components/skeletons";

type RenderProductCategoriesRowProps = {
  selectedDepartmentCategory: DepartmentCategory | null;
  selectedProductCategory: ProductCategory | null;
  handleProductCategorySelect: (category: ProductCategory) => void;
  redirectToProductCategory: (departmentId: number, categoryId: number, productCategoryId: number) => void;
};

const RenderProductCategoriesRow = ({
  selectedDepartmentCategory,
  selectedProductCategory,
  handleProductCategorySelect,
  redirectToProductCategory,
}: RenderProductCategoriesRowProps) => {
  const productCategoryNameClass = clsx("font-semibold text-base text-left w-full text-primary-dark");
  const seeMoreClass = clsx("mt-2 text-sm text-primary-dark underline hover:brightness-125 cursor-pointer");

  return (
    <>
      {selectedDepartmentCategory?.productCategories?.map((cat) => {
        const isSelected = selectedProductCategory?.id === cat.id;
        return (
          <motion.div
            key={cat.id}
            layout
            animate={
              isSelected
                ? {
                    backgroundColor: "#f7fee7",
                    borderColor: "#9cd270",
                  }
                : undefined
            }
            transition={{ duration: 0.3 }}
            onClick={() => {
              handleProductCategorySelect(cat);
            }}
            style={
              !isSelected
                ? {
                    backgroundColor: "#fff",
                    borderColor: "#d9f99d",
                  }
                : undefined
            }
            className={clsx(
              "flex flex-col items-start min-w-[70vw] max-w-[90vw] sm:min-w-0 sm:max-w-none",
              "p-5",
              "rounded-xl shadow-md",
              "border",
              "transition cursor-pointer",
              "hover:bg-lime-50",
              "sm:w-full sm:max-w-[220px]",
              {
                "bg-lime-50 border-lime-200": isSelected,
                "bg-white border-lime-100": !isSelected,
              }
            )}
          >
            <span className={productCategoryNameClass}>{cat.productCategoryName}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                redirectToProductCategory(
                  selectedDepartmentCategory?.departmentId,
                  selectedDepartmentCategory.id,
                  cat.id
                );
              }}
              className={seeMoreClass}
            >
              Ver más
            </button>
          </motion.div>
        );
      })}
    </>
  );
};

export const RenderProductCategories = () => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { selectedDepartmentCategory, departmentCategoryLoading } = useDepartmentCategories();
  const { selectedProductCategory, selectProductCategory } = useProductCategories();

  const redirectToProductCategory = (departmentId: number, departmentCategoryId: number, productCategoryId: number) => {
    router.push(
      `/browse/department/${departmentId}/department-category/${departmentCategoryId}/product-category/${productCategoryId}`
    );
  };

  const handleProductCategorySelectWithScroll = (cat: ProductCategory) => {
    const scrollLeft = scrollRef.current?.scrollLeft ?? 0;
    selectProductCategory(cat);
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollLeft;
      }
    }, 0);
  };

  return (
    <section className="mb-8 mt-10">
      <h2 className="text-xl font-semibold mb-4 text-main flex items-center gap-2">
        <ChevronRight className="text-primary" size={20} />
        Subcategorías
      </h2>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-6 px-2 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent"
      >
        {departmentCategoryLoading ? (
          Array.from({ length: 10 }).map((_, i) => <DepartmentSkeleton key={i} />)
        ) : (
          <RenderProductCategoriesRow
            selectedDepartmentCategory={selectedDepartmentCategory}
            selectedProductCategory={selectedProductCategory}
            handleProductCategorySelect={handleProductCategorySelectWithScroll}
            redirectToProductCategory={redirectToProductCategory}
          />
        )}
      </div>
    </section>
  );
};
