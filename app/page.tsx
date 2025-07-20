"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSessionStore from "@/store/session";

export default function InitApp() {
  const router = useRouter();
  const { isAuthenticated, data } = useSessionStore();

  useEffect(() => {
    const nextPath = isAuthenticated ? "/feed" : "/auth";

    const delay = 1000;
    const timeout = setTimeout(() => {
      router.replace(nextPath);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isAuthenticated, data]);

  return null;
}
