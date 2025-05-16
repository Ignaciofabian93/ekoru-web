"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import useSessionStore from "@/store/session";
import logo from "@/assets/logo.png";
import Image from "next/image";

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
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ scale: 0.7, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="relative shine-wrapper"
        >
          <Image src={logo} alt="Logo Ekoru" priority width={4096} className="shine w-[40%] mx-auto" />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
