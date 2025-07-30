import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../_graphql/product";
import { Product } from "@/types/product";
import useAlert from "@/hooks/useAlert";

export default function useProduct({ id }: { id: number }) {
  const { notifyError } = useAlert();

  const [Product, { data: productData, loading: productLoading, error: productError }] =
    useLazyQuery(GET_PRODUCT_BY_ID);

  useEffect(() => {
    if (id) {
      Product({ variables: { id } });
    }
  }, [id]);

  useEffect(() => {
    if (productError) {
      notifyError("Error al cargar el producto");
    }
  }, [productError]);

  return { product: productData?.product as Product, productLoading };
}
