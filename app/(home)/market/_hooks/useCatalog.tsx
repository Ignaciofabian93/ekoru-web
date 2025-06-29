import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_MARKET_CATALOG } from "../_graphql/catalog";
import useCategoryStore from "../_store/categories";
import useAlert from "@/hooks/useAlert";

export default function useMarketCatalog() {
  const { notifyError } = useAlert();
  const { catalog, setCatalog } = useCategoryStore();

  // Lazy query to fetch the market catalog
  const [MarketCatalog, { loading: catalogLoading }] = useLazyQuery(GET_MARKET_CATALOG);

  useEffect(() => {
    fetchCatalog();
  }, []);

  const fetchCatalog = async () => {
    try {
      const { data } = await MarketCatalog();
      if (data.marketCatalog) {
        setCatalog(data.marketCatalog);
      } else {
        notifyError("No se encontraron departamentos en el catálogo");
      }
    } catch (error) {
      notifyError("Error al cargar el catálogo de mercado");
      console.error("Error al cargar el catálogo de mercado:", error);
    }
  };

  return { catalog, catalogLoading };
}
