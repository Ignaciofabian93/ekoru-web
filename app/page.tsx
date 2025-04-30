"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSessionStore from "@/store/session";

export default function InitApp() {
  const router = useRouter();
  const { isAuthenticated } = useSessionStore();

  useEffect(() => {
    const initializeApp = (path: string) =>
      setTimeout(() => {
        router.replace(path);
      }, 2000);

    if (isAuthenticated) {
      initializeApp("/feed");
    } else {
      initializeApp("/auth");
    }
  }, [isAuthenticated, router]);

  return (
    <main>
      <h1>Initializing...</h1>
    </main>
  );
}
