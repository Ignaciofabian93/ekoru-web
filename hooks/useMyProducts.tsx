import { useLazyQuery } from "@apollo/client";
import { GET_MY_PRODUCTS } from "@/graphql/myProducts/query";
import { Product } from "@/types/product";
import useMyProductsStore from "@/store/myProducts";
import { useEffect } from "react";

export default function useMyProducts() {
  const { setMyProducts, setMyProductsLoading } = useMyProductsStore();
  const [MyProducts, { data, loading: myProductsLoading, error: myProductsError, refetch }] = useLazyQuery(
    GET_MY_PRODUCTS,
    {
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    if (data?.myProducts) {
      setMyProducts(data.myProducts as Product[]);
    }
  }, [data]);

  useEffect(() => {
    if (myProductsLoading) setMyProductsLoading(true);
    else setMyProductsLoading(false);
  }, [myProductsLoading]);

  return {
    MyProducts,
    products: (data?.myProducts as Product[]) || [],
    myProductsLoading,
    myProductsError,
    refetch: () => refetch(),
  };
}
