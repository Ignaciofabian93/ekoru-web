import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PROFILE } from "@/graphql/auth/query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import useSessionStore from "@/store/session";
import logo from "@/assets/logo.png";
import Image from "next/image";

export default function SessionWrapper({ children, token }: { children: React.ReactNode; token: string | undefined }) {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { handleSession, setIsAuthenticated, data } = useSessionStore();
  const notifyError = (error: string) => toast.error(error);

  const [GetMe, { error: authError, loading: authLoading }] = useLazyQuery(GET_PROFILE);

  const handleUserData = async () => {
    setLoading(true);
    const { data: userData } = await GetMe();
    if (authError) {
      notifyError("Ha ocurrido un error con los datos de sesión");
      router.replace("/auth");
      setLoading(false);
      return;
    }
    if (userData) {
      handleSession(userData.me);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      router.replace("/auth");
    } else {
      if (!data.name) {
        handleUserData();
      }
    }
  }, [token, data]);

  if (loading || authLoading)
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

  return <>{children}</>;
}
