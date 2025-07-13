import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import useAlert from "@/hooks/useAlert";
import useStoreListStore from "../_store/stores";
import { GET_STORES } from "../_graphql/stores";

export default function useStoreList() {
  const { notifyError } = useAlert();
  const { stores, setStores } = useStoreListStore();

  // Lazy query to fetch the market catalog
  const [Stores, { loading: storesLoading }] = useLazyQuery(GET_STORES);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const { data } = await Stores();
      if (data.stores) {
        setStores(data.stores);
      } else {
        notifyError("No se encontraron tiendas disponibles");
      }
    } catch (error) {
      notifyError("Error al cargar tiendas disponibles");
      console.error("Error al cargar tiendas disponibles:", error);
    }
  };

  return { stores, storesLoading };
}
