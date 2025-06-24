import { Product } from "@/types/product";
import useDepartments from "../market/_hooks/useDepartment";
import useDepartmentCategories from "../market/_hooks/useDepartmentCategory";

export default function useProductDisplay() {
  const { selectedDepartment } = useDepartments();
  const {
    selectedDepartmentCategory,
    selectDepartmentCategory,
    departmentCategoriesLoading,
    departmentCategoryLoading,
  } = useDepartmentCategories();

  function getProductsList() {
    const productsByDepartment: Product[] = [];
    const productsByDepartmentCategory: Product[] = [];

    if (!selectedDepartmentCategory) {
      // If no department category is selected, return whole products by department
      selectedDepartment?.departmentCategories.forEach((cat) => {
        cat.productCategories.forEach((prodCategory) => {
          prodCategory.products.forEach((product) => {
            productsByDepartment.push(product);
          });
        });
      });

      return productsByDepartment;
    } else {
      // If a department category is selected, return products by that category
      selectedDepartmentCategory.productCategories.forEach((prodCategory) => {
        prodCategory.products.forEach((product) => {
          productsByDepartmentCategory.push(product);
        });
      });

      return productsByDepartmentCategory;
    }
  }

  const productsList = getProductsList();
  return { productsList, selectedDepartment, selectedDepartmentCategory, selectDepartmentCategory };
}
