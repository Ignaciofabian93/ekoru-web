import useAlert from "@/hooks/useAlert";
import { useLazyQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import useCategoryStore from "../_store/categories";
import { useEffect, useState } from "react";
import { DepartmentCategory } from "@/types/product";
import { GET_DEPARTMENT_CATEGORIES, GET_DEPARTMENT_CATEGORY } from "../_graphql/departmentCategories";

export default function useDepartmentCategories() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<{ label: string; href?: string }[]>([]);
  const { notifyError } = useAlert();
  const { departmentCategories, selectedDepartmentCategory, setDepartmentCategories, setSelectedDepartmentCategory } =
    useCategoryStore();

  const [departmentCategoriesByDepartment, { loading: departmentCategoriesLoading }] =
    useLazyQuery(GET_DEPARTMENT_CATEGORIES);
  const [DepartmentCategory, { loading: departmentCategoryLoading }] = useLazyQuery(GET_DEPARTMENT_CATEGORY);

  const isDepartmentCategoryPage = /^\/browse\/department\/\d+\/department-category\/?$/.test(pathname);
  const departmentCategoryId = isDepartmentCategoryPage ? parseInt(pathname.split("/").pop() || "0") : null;

  console.log("isDepartmentCategoryPage:", isDepartmentCategoryPage);
  console.log("departmentCategoryId:", departmentCategoryId);

  const cleanBreadcrumbs = () => setBreadcrumbs([]);

  const selectDepartmentCategory = (departmentCategory: DepartmentCategory) =>
    setSelectedDepartmentCategory(departmentCategory);

  useEffect(() => {
    fetchDepartmentCategories();
  }, [isDepartmentCategoryPage]);

  // useEffect(() => {
  //   if (isDepartmentCategoryPage && departmentCategoryId && !selectedDepartmentCategory) {
  //     fetchDepartmentCategory(departmentCategoryId);
  //   }
  // }, [isDepartmentCategoryPage, departmentCategoryId]);

  const fetchDepartmentCategories = async () => {
    try {
      const { data } = await departmentCategoriesByDepartment({ variables: { id: 1 } });
      console.log("Fetched department categories:", data);

      if (data.departmentCategoriesByDepartment.length) {
        setDepartmentCategories(data.departmentCategoriesByDepartment);
        cleanBreadcrumbs();
        const breadcrumbs = [
          {
            label: data.departmentCategoriesByDepartment[0]?.department.departmentName,
            href: `/browse/department/${data.departmentCategoriesByDepartment[0]?.department.id}`,
          },
        ];
        setBreadcrumbs(breadcrumbs);
      } else {
        notifyError("No se encontraron categorías de departamentos");
      }
    } catch (error) {
      notifyError("Error al cargar las categorías de departamentos");
      console.error("Error fetching departments categories:", error);
    }
  };

  const fetchDepartmentCategory = async (id: number) => {
    try {
      const { data } = await DepartmentCategory({ variables: { id } });
      if (data.departmentCategory) {
        setSelectedDepartmentCategory(data.departmentCategory);
        cleanBreadcrumbs();
        // const breadcrumb = { label: data.department.departmentName, href: `/browse/department/${data.department.id}` };
        // setBreadcrumbs([breadcrumb]);
      } else {
        notifyError("No se encontró la categoría de departamento");
      }
    } catch (error) {
      notifyError("Error al cargar la categoría de departamento");
      console.error("Error fetching department category:", error);
    }
  };

  return {
    breadcrumbs,
    departmentCategories,
    selectedDepartmentCategory,
    departmentCategoriesLoading,
    departmentCategoryLoading,
    selectDepartmentCategory,
  };
}
