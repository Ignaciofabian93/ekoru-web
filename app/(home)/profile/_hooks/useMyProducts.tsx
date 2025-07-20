import { useLazyQuery } from "@apollo/client";
import useProfileStore from "../_store/profile";
import { MY_PRODUCTS } from "../_graphql/myProducts";
import { useEffect } from "react";

export default function useMyProducts() {
  const { myProducts, setMyProducts, user } = useProfileStore();

  const [ProductsByOwner, { loading: loadingProducts }] = useLazyQuery(MY_PRODUCTS);

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
