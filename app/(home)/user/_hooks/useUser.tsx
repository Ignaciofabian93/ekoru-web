"use client";
import { useEffect } from "react";
import { GET_USER } from "@/graphql/user/query";
import { useLazyQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import { GET_MY_PRODUCTS } from "@/graphql/myProducts/query";
import { Product } from "@/types/product";

export default function useUser() {
  const pathname = usePathname();

  const userId = pathname.split("/").pop() || "";

  const [User, { data: userData, loading: userLoading }] = useLazyQuery(GET_USER);

  const [MyProducts, { data: products, loading: myProductsLoading }] = useLazyQuery(GET_MY_PRODUCTS);

  useEffect(() => {
    if (userId) {
      User({
        variables: {
          userId,
        },
      });
    }
  }, [userId]);

  useEffect(() => {
    if (userId) MyProducts({ variables: { userId } });
  }, [userId, MyProducts]);

  return {
    user: userData?.user,
    userLoading,
    myProducts: (products?.myProducts as Product[]) || [],
    myProductsLoading,
  };
}
