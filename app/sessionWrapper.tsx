import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PROFILE } from "@/graphql/auth/query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useSessionStore from "@/store/session";

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
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );

  return <>{children}</>;
}
