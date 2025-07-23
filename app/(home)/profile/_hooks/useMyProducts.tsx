import { useLazyQuery } from "@apollo/client";
import useProfileStore from "../_store/profile";
import { useEffect } from "react";
import { GET_MY_PRODUCTS } from "@/graphql/myProducts/query";

export default function useMyProducts() {
  const { myProducts, setMyProducts, user } = useProfileStore();

  const [ProductsByOwner, { loading: loadingProducts }] = useLazyQuery(GET_MY_PRODUCTS);

  useEffect(() => {
    if (user?.id) {
      fetchMyProducts(user.id);
    }
  }, [user?.id]);

  const fetchMyProducts = async (userId: string) => {
    try {
      const { data } = await ProductsByOwner({ variables: { userId } });

      setMyProducts(data.productsByOwner);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return { myProducts, loadingProducts };
}
