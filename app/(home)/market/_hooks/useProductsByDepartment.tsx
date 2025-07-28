import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { PRODUCTS_BY_DEPARTMENT } from "../_graphql/productsByDepartment";
import { Product } from "@/types/product";
import useAlert from "@/hooks/useAlert";

export default function useProductsByDepartment({ id }: { id: number }) {
  const { notifyError } = useAlert();

  const [ProductsByDepartment, { data: products, loading: productsLoading, error: productsError }] =
    useLazyQuery(PRODUCTS_BY_DEPARTMENT, {
      fetchPolicy: "cache-and-network",
    });

  useEffect(() => {
    if (id) {
      ProductsByDepartment({ variables: { departmentId: id } });
    }
  }, [id]);

  useEffect(() => {
    if (productsError) {
      notifyError(productsError.message);
    }
  }, [productsError]);

  return {
    products: (products?.productsByDepartment as Product[]) || [],
    productsLoading,
  };
}
