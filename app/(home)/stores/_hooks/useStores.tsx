import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_STORES } from "@/graphql/stores/query";
import { User } from "@/types/user";
import useAlert from "@/hooks/useAlert";

export default function useStores() {
  const { notifyError } = useAlert();
  const [Stores, { data: stores, error: storesError, loading: storesLoading }] = useLazyQuery(GET_STORES);

  useEffect(() => {
    Stores();
  }, []);

  useEffect(() => {
    if (storesError) {
      notifyError("Error al cargar las tiendas");
    }
  }, [storesError]);

  return { stores: (stores?.stores as User[]) || [], storesLoading };
}
