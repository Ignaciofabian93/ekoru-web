import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLazyQuery } from "@apollo/client";
import { DepartmentCategory } from "@/types/product";
import {
  GET_DEPARTMENT_CATEGORIES,
  // GET_DEPARTMENT_CATEGORY
} from "../_graphql/departmentCategories";
import useAlert from "@/hooks/useAlert";
import useCategoryStore from "../_store/categories";

export default function useDepartmentCategories() {
  const pathname = usePathname();
  const { notifyError } = useAlert();
  const { departmentCategories, selectedDepartmentCategory, setDepartmentCategories, setSelectedDepartmentCategory } =
    useCategoryStore();

  const [departmentCategoriesByDepartment, { loading: departmentCategoriesLoading }] =
    useLazyQuery(GET_DEPARTMENT_CATEGORIES);
  // const [DepartmentCategory, { loading: departmentCategoryLoading }] = useLazyQuery(GET_DEPARTMENT_CATEGORY);

  const isDepartmentCategoryPage = /^\/browse\/department\/\d+\/department-category\/?$/.test(pathname);
  const departmentId = parseInt(pathname.split("/").pop() || "0");

  // Selects a department category, or deselects it if already selected
  const selectDepartmentCategory = (departmentCategory: DepartmentCategory) => {
    if (selectedDepartmentCategory?.id === departmentCategory.id) {
      setSelectedDepartmentCategory(null);
    } else setSelectedDepartmentCategory(departmentCategory);
  };

  useEffect(() => {
    if (departmentId && isDepartmentCategoryPage) {
      fetchDepartmentCategories();
    }
  }, [isDepartmentCategoryPage]);

  const fetchDepartmentCategories = async () => {
    try {
      const { data } = await departmentCategoriesByDepartment({ variables: { id: 1 } });
      if (data.departmentCategoriesByDepartment.length) {
        setDepartmentCategories(data.departmentCategoriesByDepartment);
      } else {
        notifyError("No se encontraron categorías de departamentos");
      }
    } catch (error) {
      notifyError("Error al cargar las categorías de departamentos");
      console.error("Error fetching departments categories:", error);
    }
  };

  return {
    departmentCategories,
    selectedDepartmentCategory,
    departmentCategoriesLoading,
    // departmentCategoryLoading,
    selectDepartmentCategory,
  };
}
