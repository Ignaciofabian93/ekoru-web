import { useEffect, useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLazyQuery } from "@apollo/client";
import { DepartmentCategory, Product } from "@/types/product";
import {
  GET_DEPARTMENT_CATEGORIES,
  GET_DEPARTMENT_CATEGORY,
} from "../_graphql/departmentCategories";
import { Filters } from "../types/filters";
import useAlert from "@/hooks/useAlert";
import useCategoryStore from "../_store/categories";

export default function useDepartmentCategories() {
  const router = useRouter();
  const pathname = usePathname();
  const { notifyError } = useAlert();
  const {
    departmentCategories,
    selectedDepartmentCategory,
    setDepartmentCategories,
    setSelectedDepartmentCategory,
    selectedProductCategory,
    setSelectedProductCategory,
  } = useCategoryStore();

  // Filtering props for selected department page
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    brands: [],
    minPrice: null,
    maxPrice: null,
    rating: null,
    location: "",
    badges: [],
  });

  const [DepartmentCategoriesByDepartment, { loading: departmentCategoriesLoading }] =
    useLazyQuery(GET_DEPARTMENT_CATEGORIES);
  const [DepartmentCategory, { loading: departmentCategoryLoading }] = useLazyQuery(
    GET_DEPARTMENT_CATEGORY
  );

  const isDepartmentCategoryPage =
    /^\/market\/department\/\d+\/department-category\/?$/.test(pathname);
  const isDepartmentCategoryIdPage =
    /^\/market\/department\/\d+\/department-category\/\d+\/?$/.test(pathname);
  const pathParts = pathname.split("/");
  const departmentIndex = pathParts.findIndex((part) => part === "department");
  const departmentId =
    departmentIndex !== -1 ? parseInt(pathParts[departmentIndex + 1] || "0") : 0;
  const departmentCategoryIndex = pathParts.findIndex(
    (part) => part === "department-category"
  );
  const departmentCategoryId =
    departmentCategoryIndex !== -1
      ? parseInt(pathParts[departmentCategoryIndex + 1] || "0")
      : 0;

  // Selects a department category, or deselects it if already selected
  const selectDepartmentCategory = (departmentCategory: DepartmentCategory) => {
    if (selectedDepartmentCategory?.id === departmentCategory.id) {
      setSelectedDepartmentCategory(null);
    } else setSelectedDepartmentCategory(departmentCategory);
  };

  function getProductsByDepartmentCategory(departmentCategories: DepartmentCategory[]) {
    const productsByDepartmentCategory: Record<string, Product[]> = {};

    departmentCategories.forEach((department) => {
      const departmentCategoryName = department.departmentCategoryName;
      departmentCategories.forEach((deptCategory) => {
        deptCategory.productCategories.forEach((prodCategory) => {
          prodCategory.products.forEach((product) => {
            if (!productsByDepartmentCategory[departmentCategoryName]) {
              productsByDepartmentCategory[departmentCategoryName] = [];
            }
            productsByDepartmentCategory[departmentCategoryName].push(product);
          });
        });
      });
    });

    return productsByDepartmentCategory;
  }

  const productsByDepartmentCategory =
    getProductsByDepartmentCategory(departmentCategories);

  const redirectToDepartmentCategory = (departmentCategoryId: number) => {
    setSelectedProductCategory(null);
    router.push(`/market/department/${departmentCategoryId}`);
  };

  const redirectToDepartmentCategorySelected = (departmentCategoryId: number) => {
    setSelectedProductCategory(null);
    router.push(
      `/market/department/${departmentId}/department-category/${departmentCategoryId}`
    );
  };

  const redirectToProductCategorySelected = (productCategoryId: number) => {
    router.push(
      `/market/department/${departmentId}/department-category/${departmentCategoryId}/product-category/${productCategoryId}`
    );
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Fetching department categories and category details

  useEffect(() => {
    if (departmentId && isDepartmentCategoryPage) {
      fetchDepartmentCategories();
    }
  }, [isDepartmentCategoryPage]);

  useEffect(() => {
    if (departmentCategoryId && isDepartmentCategoryIdPage) {
      fetchDepartmentCategory(departmentCategoryId);
    }
  }, [isDepartmentCategoryIdPage, departmentCategoryId]);

  const fetchDepartmentCategories = async () => {
    try {
      const { data } = await DepartmentCategoriesByDepartment({ variables: { id: 1 } });
      if (data.departmentCategoriesByDepartment) {
        setDepartmentCategories(data.departmentCategoriesByDepartment);
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
      } else {
        notifyError("No se encontró la categoría de departamento");
      }
    } catch (error) {
      notifyError("Error al cargar la categoría de departamento");
      console.error("Error fetching department category:", error);
    }
  };

  // /////////////////////////////////////////////////////////////////////////////////////////
  // This is for selected department products
  function getProductsList() {
    const productsByDepartmentCategory: Product[] = [];
    const productsByProductCategory: Product[] = [];

    if (!selectedProductCategory) {
      // If no department category is selected, return whole products by department
      selectedDepartmentCategory?.productCategories.forEach((cat) => {
        cat.products.forEach((product) => {
          productsByDepartmentCategory.push(product);
        });
      });

      return productsByDepartmentCategory;
    } else {
      // If a department category is selected, return products by that category
      selectedProductCategory.products.forEach((product) => {
        productsByProductCategory.push(product);
      });

      return productsByProductCategory;
    }
  }

  const productsList = getProductsList();

  // /////////////////////////////////////////////////////////////////////////////////////////
  // Filtering data for selected department page
  const brands = useMemo(
    () => Array.from(new Set(productsList.map((p) => p.brand).filter(Boolean))),
    [productsList]
  );
  const locations = useMemo(
    () =>
      Array.from(
        new Set(
          productsList
            .map((p) =>
              p.user?.county?.county && p.user?.city?.city
                ? `${p.user.county.county}, ${p.user.city.city}`
                : ""
            )
            .filter(Boolean)
        )
      ),
    [productsList]
  );
  const prices = useMemo(
    () =>
      productsList
        .map((p) => p.price)
        .filter((price) => typeof price === "number" && !isNaN(price)),
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
      const matchesBrand = selectedFilters.brands.length
        ? selectedFilters.brands.includes(product.brand)
        : true;
      const matchesLocation = selectedFilters.location
        ? selectedFilters.location ===
          product.user?.county?.county + ", " + product.user?.city?.city
        : true;
      const matchesMinPrice =
        selectedFilters.minPrice !== null
          ? product.price >= selectedFilters.minPrice
          : true;
      const matchesMaxPrice =
        selectedFilters.maxPrice !== null
          ? product.price <= selectedFilters.maxPrice
          : true;
      const matchesBadges = selectedFilters.badges.length
        ? selectedFilters.badges.some((badge) => product.badges?.includes(badge))
        : true;

      return (
        matchesBrand &&
        matchesLocation &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesBadges
      );
    });
  }, [productsList, selectedFilters]);

  return {
    departmentCategories,
    selectedDepartmentCategory,
    departmentCategoriesLoading,
    productsByDepartmentCategory,
    departmentCategoryLoading,
    selectDepartmentCategory,
    redirectToDepartmentCategory,
    filteredProductList,
    redirectToDepartmentCategorySelected,
    redirectToProductCategorySelected,
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
