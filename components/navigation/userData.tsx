"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import useSessionStore from "@/store/session";
import Image from "next/image";
import Button from "../buttons/button";

export default function UserData() {
  const router = useRouter();
  const { data } = useSessionStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userProfileImage = data.profileImage || "/brandIcon.webp";

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    router.push("/auth");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative flex flex-col items-center" ref={dropdownRef}>
      <button
        className="rounded-full overflow-hidden border-[1px] cursor-pointer border-white w-[40px] h-[40px] flex items-center justify-center focus:outline-none hover:brightness-125 transition-all duration-200 ease-in-out"
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir menú de usuario"
        type="button"
      >
        <Image
          src={userProfileImage}
          alt="User profile"
          width={40}
          height={40}
          className="object-cover w-full h-full"
        />
      </button>
      <span className="absolute -bottom-4 text-xs text-center font-semibold">Perfil</span>
      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 min-w-[260px] bg-white text-main rounded-md shadow-lg z-50 p-4 flex flex-col gap-2"
          >
            <div className="w-full flex items-center justify-between gap-2">
              <span className="font-semibold text-lg">{data.name || data.businessName}</span>
              <span
                className="flex items-center text-sm text-primary cursor-pointer"
                onClick={() => router.push("/profile")}
              >
                Ir al perfil
              </span>
            </div>
            <span className="text-sm text-main">
              {data.county.county || ""}, {data.city.city || ""}
            </span>
            <span className="text-sm text-main">{data.userCategory?.name ?? "Reciclador amateur"}</span>
            <span className="text-sm text-main">Puntos: {data.points}</span>
            <Button text="Cerrar sesión" onClick={handleLogout} variant="danger" size="sm" className="mt-4 w-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
