import { motion } from "framer-motion";
import { Department, DepartmentCategory } from "@/types/product";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import useDepartments from "../../_hooks/useDepartment";
import useDepartmentCategories from "../../_hooks/useDepartmentCategory";
import { DepartmentSkeleton } from "../../_components/skeletons";

type RenderDepartmentCategoriesProps = {
  selectedDepartment: Department | null;
  selectedDepartmentCategory: DepartmentCategory | null;
  handleDepartmentCategorySelect: (category: DepartmentCategory) => void;
  redirectToDepartmentCategory: (departmentId: number, categoryId: number) => void;
};
export const RenderDepartmentCategoriesRow = ({
  selectedDepartment,
  selectedDepartmentCategory,
  handleDepartmentCategorySelect,
  redirectToDepartmentCategory,
}: RenderDepartmentCategoriesProps) => {
  const departmentCategoryNameClass = clsx("font-semibold text-md text-center w-full mb-4 text-primary-dark clamp-2");
  const seeMoreClass = clsx(
    "absolute bottom-6 font-semibold w-full text-xs underline hover:brightness-125 cursor-pointer text-primary-dark"
  );
  return (
    <>
      {selectedDepartment?.departmentCategories?.map((cat) => {
        const isSelected = selectedDepartmentCategory?.id === cat.id;
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
              handleDepartmentCategorySelect(cat);
            }}
            style={
              !isSelected
                ? {
                    backgroundColor: "#fff",
                    borderColor: "#9cd270",
                  }
                : undefined
            }
            className={clsx(
              "min-w-[150px] min-h-[150px] w-full h-full max-w-[150px] max-h-[150px]",
              "relative rounded-full shadow-lg shadow-gray-800/30",
              "border-2",
              "flex flex-col items-center justify-center",
              "p-4",
              "transition-all duration-300 ease-in-out",
              "cursor-pointer",
              "hover:shadow-xl"
            )}
          >
            <span className={departmentCategoryNameClass}>{cat.departmentCategoryName}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                redirectToDepartmentCategory(selectedDepartment?.id as number, cat.id);
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

export const RenderDepartmentCategories = () => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { selectedDepartment } = useDepartments();
  const { selectedDepartmentCategory, selectDepartmentCategory } = useDepartmentCategories();

  const redirectToDepartmentCategory = (departmentId: number) => {
    router.push(`/market/department/${departmentId}`);
  };

  const handleDepartmentCategorySelect = (dept: DepartmentCategory) => {
    const scrollLeft = scrollRef.current?.scrollLeft ?? 0;
    selectDepartmentCategory(dept);
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
        Categorías
      </h2>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-6 px-2 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent"
      >
        {false ? (
          Array.from({ length: 10 }).map((_, i) => <DepartmentSkeleton key={i} />)
        ) : (
          <RenderDepartmentCategoriesRow
            selectedDepartment={selectedDepartment}
            selectedDepartmentCategory={selectedDepartmentCategory}
            handleDepartmentCategorySelect={handleDepartmentCategorySelect}
            redirectToDepartmentCategory={redirectToDepartmentCategory}
          />
        )}
      </div>
    </section>
  );
};
