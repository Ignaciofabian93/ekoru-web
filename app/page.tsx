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
      }, 500);

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
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
}
