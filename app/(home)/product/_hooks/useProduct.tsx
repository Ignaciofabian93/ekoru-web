import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../_graphql/product";
import useAlert from "@/hooks/useAlert";
import { Product } from "@/types/product";

export default function useProduct({ id }: { id: number }) {
  const { notifyError } = useAlert();
  const [product, setProduct] = useState<Product>({} as Product);

  const [Product, { loading: productLoading }] = useLazyQuery(GET_PRODUCT_BY_ID);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await Product({ variables: { id } });
      if (!data.product) {
        notifyError("Producto no encontrado");
        return;
      }
      setProduct(data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
      notifyError("Error al cargar el producto");
    }
  };

  return { product, productLoading };
}
