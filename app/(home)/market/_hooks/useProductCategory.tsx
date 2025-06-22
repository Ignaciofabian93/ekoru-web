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

  const isProductCategoryPage = /^\/browse\/department\/\d+\/department-category\/\d+\/product-category\/?$/.test(
    pathname
  );

  const selectProductCategory = (productCategory: ProductCategory) => setSelectedProductCategory(productCategory);

  useEffect(() => {
    fetchProductCategories();
  }, [isProductCategoryPage]);

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

  return {
    productCategories,
    selectedProductCategory,
    productCategoriesLoading,
    productCategoryLoading,
    selectProductCategory,
  };
}
