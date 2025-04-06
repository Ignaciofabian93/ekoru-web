"use client";
import { useAuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InitApp() {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    const initializeApp = (path: string) =>
      setTimeout(() => {
        router.replace(path);
      }, 2000);

    if (isAuthenticated) {
      initializeApp("/dashboard");
    } else {
      initializeApp("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <main>
      <h1>Initializing...</h1>
    </main>
  );
}
