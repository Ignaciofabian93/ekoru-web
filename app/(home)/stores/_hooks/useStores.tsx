import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import useAlert from "@/hooks/useAlert";
import useStoreListStore from "../_store/stores";
import { GET_STORE, GET_STORES } from "../_graphql/stores";
import { usePathname } from "next/navigation";

export default function useStoreList() {
  const pathname = usePathname();
  const { notifyError } = useAlert();
  const { stores, setStores, selectedStore, setSelectedStore } = useStoreListStore();

  const storeId = pathname.split("/").pop(); // Get the last segment of the path as storeId

  // Lazy query to fetch the market catalog
  const [Stores, { loading: storesLoading }] = useLazyQuery(GET_STORES);
  const [User, { loading: storeLoading }] = useLazyQuery(GET_STORE);

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    if (storeId && storeId !== "stores") {
      fetchStore(storeId);
    }
  }, [storeId]);

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

  const fetchStore = async (id: string) => {
    try {
      const { data } = await User({ variables: { id } });
      if (data && data.user) {
        setSelectedStore(data.user);
      }
    } catch (error) {
      notifyError("Error al cargar la tienda");
      console.error("Error al cargar la tienda:", error);
    }
  };

  return { stores, storesLoading, storeLoading, selectedStore };
}
