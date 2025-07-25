"use client";
import { useEffect } from "react";
import { GET_USER } from "@/graphql/user/query";
import { useLazyQuery } from "@apollo/client";
import { usePathname } from "next/navigation";

export default function useUser() {
  const pathname = usePathname();

  const userId = pathname.split("/").pop() || "";

  const [User, { data: userData, loading: userLoading }] = useLazyQuery(GET_USER);

  useEffect(() => {
    if (userId) {
      User({
        variables: {
          userId,
        },
      });
    }
  }, [userId]);

  return {
    user: userData?.user,
    userLoading,
  };
}
