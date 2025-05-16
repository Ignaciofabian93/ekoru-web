import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PROFILE } from "@/graphql/auth/query";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";
import useSessionStore from "@/store/session";

export default function SessionWrapper({ children, token }: { children: React.ReactNode; token: string | undefined }) {
  const router = useRouter();
  const pathname = usePathname();
  const { handleSession, setIsAuthenticated, data } = useSessionStore();
  const notifyError = (error: string) => toast.error(error);

  const [GetMe, { error: authError }] = useLazyQuery(GET_PROFILE);

  const handleUserData = async () => {
    const { data: userData } = await GetMe();
    if (authError) {
      notifyError("Ha ocurrido un error con los datos de sesión");
      router.replace("/auth");
      return;
    }
    if (userData) {
      handleSession(userData.me);
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    if (pathname !== "/" && pathname !== "/auth") {
      if (!token) {
        router.replace("/auth");
      } else {
        if (!data.name) {
          handleUserData();
        }
      }
    }
  }, [token, data]);

  return <>{children}</>;
}
