import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_MARKET_MENU, GET_STORE_MENU } from "@/graphql/menu/query";
import useMenuStore from "@/store/menu";

export default function useMenu() {
  const {
    setMarket,
    setStores,
    // setServices,
    // setCommunity,
    // setCulture,
    market,
    stores,
    services,
    community,
    culture,
  } = useMenuStore();
  const [getMarketMenu, { loading: marketLoading }] = useLazyQuery(GET_MARKET_MENU);
  const [getStoreMenu, { loading: storesLoading }] = useLazyQuery(GET_STORE_MENU);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const [marketResult, storeResult] = await Promise.all([getMarketMenu(), getStoreMenu()]);
      if (marketResult.data && marketResult.data.marketCatalog) {
        setMarket(marketResult.data.marketCatalog);
      }
      if (storeResult.data && storeResult.data.storeCatalog) {
        setStores(storeResult.data.storeCatalog);
      }
    } catch (error) {
      console.error("Error al intentar cargar el menú:", error);
    }
  };

  return { market, stores, services, community, culture, marketLoading, storesLoading };
}
