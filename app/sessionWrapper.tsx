import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PROFILE } from "@/app/auth/_graphql/query";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import useSessionStore from "@/store/session";
import logo from "@/assets/logo.png";
import Image from "next/image";

export default function SessionWrapper({ children, token }: { children: React.ReactNode; token: string | undefined }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [animationDone, setAnimationDone] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const { handleSession, setIsAuthenticated, data } = useSessionStore();
  const notifyError = (error: string) => toast.error(error);

  const [GetMe, { error: authError, loading: authLoading }] = useLazyQuery(GET_PROFILE);

  const handleUserData = async () => {
    try {
      const { data: userData } = await GetMe();
      if (userData) {
        handleSession(userData.me);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        notifyError("Error al intentar iniciar sesión.");
        router.replace("/auth");
      }
    } catch (error) {
      console.error(authError);
      toast.error("Sesión expirada. Redirigiendo...");
      setIsAuthenticated(false);
      router.replace("/auth");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token && animationDone) {
      setIsAuthenticated(false);
      setLoading(false);
      router.replace("/auth");
      return;
    }

    if (token && !data.id) {
      handleUserData();
    } else if (token && data.id) {
      setLoading(false);
    }
  }, [token, animationDone, data]);

  useEffect(() => {
    const fallback = setTimeout(() => {
      if (!animationDone) setAnimationDone(true);
    }, 3000);
    return () => clearTimeout(fallback);
  }, []);

  if ((loading || authLoading) && pathname === "/") {
    return (
      <main className="w-full h-screen flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ scale: 0.8, opacity: 0.8, filter: "brightness(90%)" }}
            animate={{ scale: 1, opacity: 1, filter: "brightness(120%)" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            onAnimationComplete={() => setAnimationDone(true)}
          >
            <Image src={logo} alt="Logo Ekoru" priority width={4096} className="w-[40%] mx-auto" />
          </motion.div>
        </AnimatePresence>
      </main>
    );
  }

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}
