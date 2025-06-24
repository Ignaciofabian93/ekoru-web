import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { usePathname, useRouter } from "next/navigation";
import { Department, Product } from "@/types/product";
import { GET_DEPARTMENT, GET_DEPARTMENTS } from "../_graphql/departments";
import useAlert from "@/hooks/useAlert";
import useCategoryStore from "../_store/categories";

export default function useDepartments() {
  const router = useRouter();
  const pathname = usePathname();
  const { notifyError } = useAlert();
  const { departments, setDepartments, selectedDepartment, setSelectedDepartment } = useCategoryStore();

  const [Departments, { loading: departmentsLoading }] = useLazyQuery(GET_DEPARTMENTS);
  const [Department, { loading: departmentLoading }] = useLazyQuery(GET_DEPARTMENT);

  const isAllDepartmentsPage = pathname === "/market/department";
  const isDepartmentPage = pathname.startsWith("/market/department/");
  const departmentId = isDepartmentPage ? parseInt(pathname.split("/").pop() || "0") : null;

  const selectDepartment = (department: Department) => {
    if (selectedDepartment?.id === department.id) setSelectedDepartment(null);
    else setSelectedDepartment(department);
  };

  function getProductsByDepartment(departments: Department[]) {
    const productsByDepartment: Record<string, Product[]> = {};

    departments.forEach((department) => {
      const departmentName = department.departmentName;
      department.departmentCategories.forEach((deptCategory) => {
        deptCategory.productCategories.forEach((prodCategory) => {
          prodCategory.products.forEach((product) => {
            if (!productsByDepartment[departmentName]) {
              productsByDepartment[departmentName] = [];
            }
            productsByDepartment[departmentName].push(product);
          });
        });
      });
    });

    return productsByDepartment;
  }

  const productsByDepartment = getProductsByDepartment(departments);

  const redirectToDepartment = (departmentId: number) => {
    router.push(`/market/department/${departmentId}`);
  };

  console.log("isAllDepartmentsPage:", isAllDepartmentsPage);

  console.log("isDepartmentPage:", isDepartmentPage);
  console.log("departmentId:", departmentId);

  useEffect(() => {
    fetchDepartments();
  }, [isAllDepartmentsPage]);

  useEffect(() => {
    if (isDepartmentPage && departmentId) {
      fetchDepartment(departmentId);
    }
  }, [isDepartmentPage, departmentId]);

  const fetchDepartments = async () => {
    try {
      const { data } = await Departments();
      if (data.departments) {
        setDepartments(data.departments);
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
      } else {
        notifyError("No se encontró el departamento");
      }
    } catch (error) {
      notifyError("Error al cargar el departamento");
      console.error("Error fetching department:", error);
    }
  };

  return {
    departments,
    selectedDepartment,
    departmentLoading,
    departmentsLoading,
    selectDepartment,
    productsByDepartment,
    redirectToDepartment,
  };
}
