import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PROFILE } from "@/graphql/auth/query";
import { toast } from "react-toastify";
import useSessionStore from "@/store/session";

export default function SessionWrapper({ children, token }: { children: React.ReactNode; token: string | undefined }) {
  const { handleSession, setIsAuthenticated, data } = useSessionStore();
  const notifyError = (error: string) => toast.error(error);

  const [GetMe, { error: authError }] = useLazyQuery(GET_PROFILE);

  const handleUserData = async () => {
    const { data: userData } = await GetMe({ variables: { token } });
    if (authError) {
      notifyError("Ha ocurrido un error con los datos de sesión");
      return;
    }
    if (userData) {
      handleSession(userData.me);
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    if (!data.name) {
      handleUserData();
    }
  }, [token]);

  return <>{children}</>;
}
