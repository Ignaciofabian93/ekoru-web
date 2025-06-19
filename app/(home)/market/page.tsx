"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function BrowsePage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/market") {
      router.push("/market/department");
    }
  }, [pathname]);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
}
