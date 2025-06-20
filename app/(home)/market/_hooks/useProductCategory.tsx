import useAlert from "@/hooks/useAlert";
import { useLazyQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import useCategoryStore from "../_store/categories";
import { useEffect, useState } from "react";
import { ProductCategory } from "@/types/product";
import { GET_PRODUCT_CATEGORIES, GET_PRODUCT_CATEGORY } from "../_graphql/productCategories";

export default function useProductCategories() {
  const pathname = usePathname();
  const { notifyError } = useAlert();
  const { productCategories, selectedProductCategory, setSelectedProductCategory, setProductCategories } =
    useCategoryStore();

  const [ProductCategories, { loading: productCategoriesLoading }] = useLazyQuery(GET_PRODUCT_CATEGORIES);
  const [ProductCategory, { loading: productCategoryLoading }] = useLazyQuery(GET_PRODUCT_CATEGORY);

  const isAllDepartmentsPage = pathname === "/browse/department";
  const isDepartmentPage = pathname.startsWith("/browse/department/");
  const departmentId = isDepartmentPage ? parseInt(pathname.split("/").pop() || "0") : null;

  const selectProductCategory = (productCategory: ProductCategory) => setSelectedProductCategory(productCategory);

  const fetchProductCategories = async () => {
    try {
      const { data } = await ProductCategories();
      if (data.productCategories) {
        setProductCategories(data.productCategories);
      } else {
        notifyError("No se encontraron categorías de productos");
      }
    } catch (error) {
      notifyError("Error al cargar las categorías de productos");
      console.error("Error fetching product categories:", error);
    }
  };

  const fetchProductCategory = async (id: number) => {
    try {
      const { data } = await ProductCategory({ variables: { id } });
      if (data.department) {
        setSelectedProductCategory(data.department);
      } else {
        notifyError("No se encontró la categoría de producto");
      }
    } catch (error) {
      notifyError("Error al cargar la categoría de producto");
      console.error("Error fetching product category:", error);
    }
  };

  return {
    productCategories,
    selectedProductCategory,
    productCategoriesLoading,
    productCategoryLoading,
    selectProductCategory,
  };
}
