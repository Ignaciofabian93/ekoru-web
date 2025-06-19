import useAlert from "@/hooks/useAlert";
import { useLazyQuery } from "@apollo/client";
import { GET_DEPARTMENT, GET_DEPARTMENTS } from "../_graphql/departments";
import { usePathname } from "next/navigation";
import useCategoryStore from "../_store/categories";
import { useEffect, useState } from "react";
import { Department } from "@/types/product";

export default function useProductCategories() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<{ label: string; href?: string }[]>([]);
  const { notifyError } = useAlert();
  const { departments, setDepartments, selectedDepartment, setSelectedDepartment } = useCategoryStore();

  const [Departments, { loading: departmentsLoading }] = useLazyQuery(GET_DEPARTMENTS);
  const [Department, { loading: departmentLoading }] = useLazyQuery(GET_DEPARTMENT);

  const isAllDepartmentsPage = pathname === "/browse/department";
  const isDepartmentPage = pathname.startsWith("/browse/department/");
  const departmentId = isDepartmentPage ? parseInt(pathname.split("/").pop() || "0") : null;

  const cleanBreadcrumbs = () => setBreadcrumbs([]);

  const selectDepartment = (department: Department) => setSelectedDepartment(department);

  useEffect(() => {
    fetchDepartments();
  }, [isAllDepartmentsPage]);

  useEffect(() => {
    if (isDepartmentPage && departmentId && !selectedDepartment) {
      fetchDepartment(departmentId);
    }
  }, [isDepartmentPage, departmentId]);

  const fetchDepartments = async () => {
    try {
      const { data } = await Departments();
      if (data.departments) {
        setDepartments(data.departments);
        cleanBreadcrumbs();
        const breadcrumb = { label: "Todos los departamentos", href: "/browse/department" };
        setBreadcrumbs([breadcrumb]);
      } else {
        notifyError("No se encontraron departamentos");
      }
    } catch (error) {
      notifyError("Error al cargar los departamentos");
      console.error("Error fetching departments:", error);
    }
  };

  const fetchDepartment = async (id: number) => {
    try {
      const { data } = await Department({ variables: { id } });
      if (data.department) {
        setSelectedDepartment(data.department);
        cleanBreadcrumbs();
        const breadcrumb = { label: data.department.departmentName, href: `/browse/department/${data.department.id}` };
        setBreadcrumbs([breadcrumb]);
      } else {
        notifyError("No se encontró el departamento");
      }
    } catch (error) {
      notifyError("Error al cargar el departamento");
      console.error("Error fetching department:", error);
    }
  };

  return { departments, selectedDepartment, departmentLoading, departmentsLoading, breadcrumbs, selectDepartment };
}
