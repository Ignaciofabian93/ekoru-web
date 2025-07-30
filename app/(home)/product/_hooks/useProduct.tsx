import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { Product } from "@/types/product";
import { GET_PRODUCT_BY_ID } from "@/graphql/products/productById";
import { GET_PRODUCTS_BY_PRODUCT_CATEGORY_ID } from "@/graphql/products/productsByProductCategoryId";
import { GET_PRODUCTS_BY_DEPARTMENT_CATEGORY_ID } from "@/graphql/products/productsByDepartmentCategoryId";
import { GET_PRODUCTS_BY_DEPARTMENT_ID } from "@/graphql/products/productsByDepartment";
import useAlert from "@/hooks/useAlert";

export default function useProduct({ id }: { id: number }) {
  const { notifyError } = useAlert();

  const [Product, { data: productData, loading: productLoading, error: productError }] =
    useLazyQuery(GET_PRODUCT_BY_ID);

  const [
    ProductsByProductCategory,
    {
      data: productsByProductCategoryData,
      loading: productsByProductCategoryLoading,
      error: productsByProductCategoryError,
    },
  ] = useLazyQuery(GET_PRODUCTS_BY_PRODUCT_CATEGORY_ID);

  const [
    ProductsByDepartmentCategory,
    {
      data: productsByDepartmentCategoryData,
      loading: productsByDepartmentCategoryLoading,
      error: productsByDepartmentCategoryError,
    },
  ] = useLazyQuery(GET_PRODUCTS_BY_DEPARTMENT_CATEGORY_ID);

  const [
    ProductsByDepartment,
    {
      data: productsByDepartmentData,
      loading: productsByDepartmentLoading,
      error: productsByDepartmentError,
    },
  ] = useLazyQuery(GET_PRODUCTS_BY_DEPARTMENT_ID);

  useEffect(() => {
    if (id) {
      Product({ variables: { id } });
    }
  }, [id]);

  useEffect(() => {
    if (productData && productData.product) {
      const { product } = productData;
      ProductsByProductCategory({
        variables: { productCategoryId: (product as Product).productCategory?.id },
      });

      ProductsByDepartmentCategory({
        variables: {
          departmentCategoryId: (product as Product).productCategory.departmentCategory?.id,
        },
      });
      ProductsByDepartment({
        variables: { departmentId: (product as Product).productCategory.departmentCategory.department?.id },
      });
    }
  }, [productData]);

  useEffect(() => {
    if (productError) {
      notifyError("Error al cargar el producto");
    }
  }, [productError]);

  useEffect(() => {
    if (productsByProductCategoryError) {
      console.error(
        "Error al cargar los productos por categoría de producto",
        productsByProductCategoryError
      );
    }
  }, [productsByProductCategoryError]);

  useEffect(() => {
    if (productsByDepartmentCategoryError) {
      console.error(
        "Error al cargar los productos por categoría de departamento",
        productsByDepartmentCategoryError
      );
    }
  }, [productsByDepartmentCategoryError]);

  useEffect(() => {
    if (productsByDepartmentError) {
      console.error("Error al cargar los productos por departamento", productsByDepartmentError);
    }
  }, [productsByDepartmentError]);

  return {
    product: productData?.product as Product,
    productsByProductCategory: productsByProductCategoryData?.productsByProductCategory as Product[],
    productsByDepartmentCategory: productsByDepartmentCategoryData?.productsByDepartmentCategory as Product[],
    productsByDepartment: productsByDepartmentData?.productsByDepartment as Product[],
    productsByProductCategoryLoading,
    productsByDepartmentCategoryLoading,
    productsByDepartmentLoading,
    productLoading,
  };
}
