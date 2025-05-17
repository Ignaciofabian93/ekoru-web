import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PROFILE } from "@/graphql/auth/query";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import useSessionStore from "@/store/session";
import logo from "@/assets/logo.png";
import Image from "next/image";

export default function SessionWrapper({ children, token }: { children: React.ReactNode; token: string | undefined }) {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();
  const { handleSession, setIsAuthenticated, data } = useSessionStore();
  const notifyError = (error: string) => toast.error(error);

  console.log("PATH::", pathname);

  const [GetMe, { error: authError, loading: authLoading }] = useLazyQuery(GET_PROFILE);

  const handleUserData = async () => {
    setLoading(true);
    const { data: userData } = await GetMe();
    if (authError) {
      notifyError("Ha ocurrido un error con los datos de sesión");
      setTimeout(() => {
        setLoading(false);
        router.replace("/auth");
      }, 2000);
      return;
    }
    if (userData) {
      handleSession(userData.me);
      setIsAuthenticated(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        setLoading(false);
        router.replace("/auth");
      }, 2000);
    } else {
      if (!data.name) {
        handleUserData();
      }
    }
  }, [token, data]);

  if (loading || authLoading) {
    pathname === "/" ? (
      <main className="w-full h-screen flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ scale: 0.7, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="relative shine-wrapper"
          >
            <Image src={logo} alt="Logo Ekoru" priority width={4096} className="shine w-[40%] mx-auto" />
          </motion.div>
        </AnimatePresence>
      </main>
    ) : (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}
