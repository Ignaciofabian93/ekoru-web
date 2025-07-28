import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_FEED_PRODUCTS } from "../_graphql/feedProducts";
import { Product } from "@/types/product";
import { usePathname } from "next/navigation";
import useAlert from "@/hooks/useAlert";
import useSessionStore from "@/store/session";

type Scope = "MARKET" | "STORE";

export default function useExchangeableProducts({
  scope,
  isExchangeable,
}: {
  scope: Scope;
  isExchangeable: boolean;
}) {
  const pathname = usePathname();
  const { data } = useSessionStore();
  const { notifyError } = useAlert();
  const [fetchProducts, { data: products, loading, error, refetch }] = useLazyQuery(GET_FEED_PRODUCTS, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    fetchProducts({ variables: { userId: data.id, take: 10, scope, isExchangeable } });
  }, [fetchProducts, scope, isExchangeable]);

  useEffect(() => {
    if (error) {
      notifyError("No se encontraron productos de intercambio");
    }
  }, [error]);

  useEffect(() => {
    refetch({ userId: data.id, take: 10, scope, isExchangeable });
  }, [pathname, refetch, scope, isExchangeable]);

  return {
    products: (products?.feedProducts as Product[]) || [],
    loading,
    refetch: () => refetch({ userId: data.id, take: 10, scope, isExchangeable }),
  };
}
