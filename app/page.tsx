"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSessionStore from "@/store/session";

export default function InitApp() {
  const router = useRouter();
  const { isAuthenticated, data } = useSessionStore();

  useEffect(() => {
    const initializeApp = (path: string) =>
      setTimeout(() => {
        router.replace(path);
      }, 3000);

    if (isAuthenticated) {
      if (data.isCompany) {
        initializeApp("/dashboard");
      } else {
        initializeApp("/feed");
      }
    } else {
      initializeApp("/auth");
    }
  }, [isAuthenticated, router, data]);

  return (
    <main>
      <h1>Initializing...</h1>
    </main>
  );
}
