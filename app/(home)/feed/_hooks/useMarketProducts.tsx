import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_FEED_PRODUCTS } from "../_graphql/products";
import { Product } from "@/types/product";
import { usePathname } from "next/navigation";
import useAlert from "@/hooks/useAlert";

type Scope = "MARKET" | "STORE";

export default function useMarketProducts({ scope, exchange }: { scope: Scope; exchange: boolean }) {
  const pathname = usePathname();
  const { notifyError } = useAlert();
  const [fetchProducts, { data, loading, error, refetch }] = useLazyQuery(GET_FEED_PRODUCTS, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    fetchProducts({ variables: { take: 10, scope, exchange } });
  }, [fetchProducts, scope, exchange]);

  useEffect(() => {
    if (error) {
      notifyError("No se encontraron productos");
    }
  }, [error]);

  useEffect(() => {
    refetch({ take: 10, scope, exchange });
  }, [pathname, refetch, scope, exchange]);

  return {
    products: (data?.feedProducts as Product[]) || [],
    loading,
    refetch: () => refetch({ take: 10, scope, exchange }),
  };
}
