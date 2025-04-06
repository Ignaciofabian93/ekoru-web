import { createContext, useContext, useState, useEffect } from "react";

type Auth = {
  isAuthenticated: boolean;
};

const AuthContext = createContext<Auth>({
  isAuthenticated: false,
});

export const useAuthContext = () => useContext(AuthContext);

export default function AuthProvider({ children, token }: { children: React.ReactNode; token: string | undefined }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
}
