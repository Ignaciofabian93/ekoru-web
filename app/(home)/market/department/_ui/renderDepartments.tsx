import { motion } from "framer-motion";
import { Department } from "@/types/product";
import clsx from "clsx";

type RenderDepartmentsProps = {
  departments: Department[] | null;
  selectedDepartment: Department | null;
  handleDepartmentSelect: (department: Department) => void;
  redirectToDepartment: (departmentId: number) => void;
};

export const RenderDepartments = ({
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
              "min-w-[150px] min-h-[150px]",
              "relative rounded-full shadow-lg",
              "border-2",
              "flex flex-col items-center justify-center",
              "p-4",
              "cursor-pointer",
              "hover:shadow-xl"
            )}
          >
            <span className={departmentNameClass}>{dept.departmentName}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
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
