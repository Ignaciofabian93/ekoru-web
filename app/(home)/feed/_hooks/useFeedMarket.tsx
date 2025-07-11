import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_FEED_PRODUCTS } from "../_graphql/products";
// import useAlert from "@/hooks/useAlert";
import { Product } from "@/types/product";

type Scope = "MARKET" | "STORE";

export default function useFeedMarket({ scope, exchange }: { scope: Scope; exchange: boolean }) {
  // const { notifyError } = useAlert();
  const [products, setProducts] = useState<Product[]>([]);

  const [Products, { loading }] = useLazyQuery(GET_FEED_PRODUCTS);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await Products({ variables: { take: 10, scope, exchange } });
      if (data) {
        setProducts(data.feedProducts);
      } else {
        console.log("No se encontraron productos");
      }
    }

    fetchProducts();
  }, []);

  return {
    products,
    loading,
  };
}
