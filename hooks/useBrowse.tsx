"use client";

import { useRouter } from "next/navigation";
import useAlert from "./useAlert";
import useBrowseStore from "@/store/browse";
import { useLazyQuery } from "@apollo/client";
import { MARKET_BROWSE } from "@/graphql/market/query";
import { useEffect } from "react";

export default function useBrowse() {
  const router = useRouter();
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

  const [ProductCategories, { loading: browseLoading }] = useLazyQuery(MARKET_BROWSE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await ProductCategories();
        if (data) {
          setProductCategories(data.productCategories);
        }
      } catch (error) {
        notifyError("Error al intentar obtener las categorías de productos.");
      }
    };

    fetchData();
  }, []);

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
  };
}
