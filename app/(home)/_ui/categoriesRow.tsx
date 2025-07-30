import { motion } from "framer-motion";
import { Department, DepartmentCategory, ProductCategory } from "@/types/product";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";
import { DepartmentSkeleton } from "../market/_ui/skeletons";
import clsx from "clsx";

type RenderRowProps = {
  data: Department[] | DepartmentCategory[] | ProductCategory[] | null;
  selectedData: Department | DepartmentCategory | ProductCategory | null;
  selectDataObject: (obj: Department | DepartmentCategory | ProductCategory) => void;
  redirect: (id: number) => void;
};

const RenderRow = ({ data, selectedData, selectDataObject, redirect }: RenderRowProps) => {
  const departmentNameClass = clsx("font-semibold text-md text-center w-full mb-4 text-primary-dark");
  const seeMoreClass = clsx(
    "absolute bottom-6 font-semibold w-full text-xs underline hover:brightness-125 cursor-pointer text-primary-dark"
  );
  return (
    <>
      {data?.map((dept) => {
        const isSelected = selectedData?.id === dept.id;
        const categoryName = () => {
          switch (dept.__typename) {
            case "Department":
              return dept.departmentName;
            case "DepartmentCategory":
              return dept.departmentCategoryName;
            case "ProductCategory":
              return dept.productCategoryName;
            default:
              return "";
          }
        };
        return (
          <motion.div
            key={dept.id}
            onClick={() => selectDataObject(dept)}
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
            <span className={departmentNameClass}>{categoryName()}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                selectDataObject(dept);
                redirect(dept.id);
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

type Props = {
  moduleName: string;
  data: Department[] | DepartmentCategory[] | ProductCategory[] | null;
  selectedObject: Department | DepartmentCategory | ProductCategory | null;
  selectObject: (obj: Department | DepartmentCategory | ProductCategory) => void;
  redirect: (id: number) => void;
  isLoading: boolean;
};

export const RenderCategories = ({
  moduleName,
  data,
  selectedObject,
  selectObject,
  redirect,
  isLoading,
}: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleObjectSelect = (obj: Department | DepartmentCategory | ProductCategory) => {
    const scrollLeft = scrollRef.current?.scrollLeft ?? 0;
    selectObject(obj);
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
        {moduleName || "Categorías"}
      </h2>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-6 px-2 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent"
      >
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => <DepartmentSkeleton key={i} />)
        ) : (
          <RenderRow
            data={data}
            selectedData={selectedObject}
            selectDataObject={handleObjectSelect}
            redirect={redirect}
          />
        )}
      </div>
    </section>
  );
};
