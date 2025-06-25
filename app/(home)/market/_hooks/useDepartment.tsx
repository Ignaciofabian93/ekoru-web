import { useEffect, useMemo, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { usePathname, useRouter } from "next/navigation";
import { Department, Product } from "@/types/product";
import { GET_DEPARTMENT, GET_DEPARTMENTS } from "../_graphql/departments";
import useAlert from "@/hooks/useAlert";
import useCategoryStore from "../_store/categories";
import { Badge } from "@/types/enums";

export type Filters = {
  brands: string[];
  minPrice: number | null;
  maxPrice: number | null;
  rating: number | null;
  location: string;
  badges: Badge[];
};

export default function useDepartments() {
  const router = useRouter();
  const pathname = usePathname();
  const { notifyError } = useAlert();
  const { departments, setDepartments, selectedDepartment, setSelectedDepartment, selectedDepartmentCategory } =
    useCategoryStore();

  // Filtering props for selected department page
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    brands: [],
    minPrice: null,
    maxPrice: null,
    rating: null,
    location: "",
    badges: [],
  });

  // Lazy queries to fetch departments and a specific department
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

  // /////////////////////////////////////////////////////////////////////////////////////////
  // This is for selected department products
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

  // /////////////////////////////////////////////////////////////////////////////////////////
  // Filtering data for selected department page
  const brands = useMemo(() => Array.from(new Set(productsList.map((p) => p.brand).filter(Boolean))), [productsList]);
  const locations = useMemo(
    () =>
      Array.from(
        new Set(
          productsList
            .map((p) =>
              p.user?.county?.county && p.user?.city?.city ? `${p.user.county.county}, ${p.user.city.city}` : ""
            )
            .filter(Boolean)
        )
      ),
    [productsList]
  );
  const prices = useMemo(
    () => productsList.map((p) => p.price).filter((price) => typeof price === "number" && !isNaN(price)),
    [productsList]
  );
  const minPrice = useMemo(() => (prices.length ? Math.min(...prices) : null), [prices]);
  const maxPrice = useMemo(() => (prices.length ? Math.max(...prices) : null), [prices]);
  const badges = useMemo(() => {
    const allBadges = productsList.flatMap((p) => p.badges || []);
    return Array.from(new Set(allBadges));
  }, [productsList]);

  const onFilterChange = (filters: Partial<Filters>) => {
    setSelectedFilters((prev) => ({
      ...prev,
      ...filters,
    }));
  };

  const filteredProductList = useMemo(() => {
    return productsList.filter((product) => {
      const matchesBrand = selectedFilters.brands.length ? selectedFilters.brands.includes(product.brand) : true;
      const matchesLocation = selectedFilters.location
        ? selectedFilters.location === product.user?.county?.county + ", " + product.user?.city?.city
        : true;
      const matchesMinPrice = selectedFilters.minPrice !== null ? product.price >= selectedFilters.minPrice : true;
      const matchesMaxPrice = selectedFilters.maxPrice !== null ? product.price <= selectedFilters.maxPrice : true;
      const matchesBadges = selectedFilters.badges.length
        ? selectedFilters.badges.some((badge) => product.badges?.includes(badge))
        : true;

      return matchesBrand && matchesLocation && matchesMinPrice && matchesMaxPrice && matchesBadges;
    });
  }, [productsList, selectedFilters]);

  return {
    departments,
    selectedDepartment,
    departmentLoading,
    departmentsLoading,
    selectDepartment,
    productsByDepartment,
    redirectToDepartment,
    filteredProductList,
    // Filtering props
    selectedFilters,
    brands,
    locations,
    minPrice,
    maxPrice,
    badges,
    onFilterChange,
  };
}
