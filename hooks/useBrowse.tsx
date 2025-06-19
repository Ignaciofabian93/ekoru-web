"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLazyQuery } from "@apollo/client";
import {
  MARKET_BROWSE_DEPARTMENT_CATEGORIES_BY_ID,
  MARKET_BROWSE_DEPARTMENTS,
  MARKET_BROWSE_MENU,
} from "@/graphql/market/query";
import useAlert from "./useAlert";
import useBrowseStore from "@/store/browse";

export default function useBrowse() {
  const router = useRouter();
  const pathname = usePathname();
  const isBrowsePage = pathname.startsWith("/browse");
  const isSearchPage = pathname.startsWith("/search");
  const { notifyError } = useAlert();
  const {
    departments,
    departmentCategories,
    productCategories,
    products,
    selectedDepartment,
    selectedDepartmentCategory,
    selectedProduct,
    selectedProductCategory,
    setDepartments,
    setDepartmentCategories,
    setProductCategories,
    setProducts,
    setSelectedDepartment,
    setSelectedDepartmentCategory,
    setSelectedProductCategory,
    setSelectedProduct,
  } = useBrowseStore();

  const [ProductCategories, { loading: browseLoading }] = useLazyQuery(MARKET_BROWSE_MENU);
  const [Departments, { loading: loadingDepartments }] = useLazyQuery(MARKET_BROWSE_DEPARTMENTS);
  const [DepartmentCategoriesByDepartment, { loading: loadingDepartmentCategories }] = useLazyQuery(
    MARKET_BROWSE_DEPARTMENT_CATEGORIES_BY_ID
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await ProductCategories();
  //     if (data) {
  //       setProductCategories(data.productCategories);
  //     } else {
  //       notifyError("Error al intentar obtener las categorías de productos.");
  //     }
  //   };

  //   fetchData();
  // }, [isBrowsePage, isSearchPage]);

  // useEffect(() => {
  //   if (selectedDepartmentCategory) {
  //     const id = selectedDepartmentCategory.id;
  //     fetchDepartmentCategories(id);
  //   } else if (!selectedDepartmentCategory) {
  //     console.log("pathname", pathname);
  //     const departmentId = pathname.split("/")[3];
  //     console.log("departmentId", departmentId);
  //     if (departmentId) {
  //       fetchDepartmentCategories(parseInt(departmentId));
  //     } else {
  //       notifyError("No se ha seleccionado una categoría de departamento válida.");
  //     }
  //   }
  // }, [selectedDepartmentCategory, pathname]);

  const fetchDepartmentCategories = async (id: number) => {
    const { data } = await DepartmentCategoriesByDepartment({
      variables: { id },
    });
    console.log("data", data);

    if (data) {
      setDepartmentCategories(data.departmentCategoriesByDepartment);
    } else {
      notifyError("Error al intentar obtener las categorías del departamento.");
    }
  };

  const fetchDepartments = async () => {
    const { data } = await Departments();
    console.log("Fetched Departments:", data);

    if (data) {
      setDepartments(data.departments);
    } else {
      notifyError("Error al intentar obtener los departamentos.");
    }
  };

  return {
    departments,
    departmentCategories,
    productCategories,
    products,
    selectedDepartment,
    selectedDepartmentCategory,
    selectedProduct,
    selectedProductCategory,
    browseLoading,
    fetchDepartments,
    loadingDepartments,
    setSelectedDepartment,
    setSelectedDepartmentCategory,
    setSelectedProductCategory,
    setSelectedProduct,
    loadingDepartmentCategories,
  };
}
