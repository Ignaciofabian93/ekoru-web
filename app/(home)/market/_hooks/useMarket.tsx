import useDepartments from "./useDepartment";
import useDepartmentCategories from "./useDepartmentCategory";
import useProductCategories from "./useProductCategory";

export default function useMarket() {
  const {} = useDepartments();
  const {} = useDepartmentCategories();
  const {} = useProductCategories();
  return {};
}
