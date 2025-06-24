import { motion } from "framer-motion";
import { Department } from "@/types/product";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";
import { DepartmentSkeleton } from "../../_components/skeletons";

type RenderDepartmentsProps = {
  departments: Department[] | null;
  selectedDepartment: Department | null;
  handleDepartmentSelect: (department: Department) => void;
  redirectToDepartment: (departmentId: number) => void;
};

const RenderDepartmentsRow = ({
  departments,
  selectedDepartment,
  handleDepartmentSelect,
  redirectToDepartment,
}: RenderDepartmentsProps) => {
  const departmentNameClass = clsx("font-semibold text-md text-center w-full mb-4 text-primary-dark");
  const seeMoreClass = clsx(
    "absolute bottom-6 font-semibold w-full text-xs underline hover:brightness-125 cursor-pointer text-primary-dark"
  );
  return (
    <>
      {departments?.map((dept) => {
        const isSelected = selectedDepartment?.id === dept.id;
        return (
          <motion.div
            key={dept.id}
            onClick={() => handleDepartmentSelect(dept)}
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
            <span className={departmentNameClass}>{dept.departmentName}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDepartmentSelect(dept);
                redirectToDepartment(dept.id);
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
  departments: Department[] | null;
  selectedDepartment: Department | null;
  selectDepartment: (department: Department) => void;
  redirectToDepartment: (departmentId: number) => void;
  departmentsLoading?: boolean;
};

export const RenderDepartments = ({
  departments,
  selectedDepartment,
  selectDepartment,
  redirectToDepartment,
  departmentsLoading,
}: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleDepartmentSelect = (dept: Department) => {
    const scrollLeft = scrollRef.current?.scrollLeft ?? 0;
    selectDepartment(dept);
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
        Departamentos
      </h2>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-6 px-2 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent"
      >
        {departmentsLoading ? (
          Array.from({ length: 10 }).map((_, i) => <DepartmentSkeleton key={i} />)
        ) : (
          <RenderDepartmentsRow
            departments={departments}
            selectedDepartment={selectedDepartment}
            handleDepartmentSelect={handleDepartmentSelect}
            redirectToDepartment={redirectToDepartment}
          />
        )}
      </div>
    </section>
  );
};
