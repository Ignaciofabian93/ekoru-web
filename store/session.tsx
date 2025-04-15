import { create } from "zustand";

type UserData = {
  name: string;
  email: string;
  isCompany: boolean;
  createdAt: string;
  updatedAt: string;
};

type SessionStore = {
  data: UserData;
  handleSession: (data: UserData) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const useSessionStore = create<SessionStore>((set) => ({
  data: {
    name: "",
    email: "",
    isCompany: false,
    createdAt: "",
    updatedAt: "",
  },
  handleSession: (data: UserData) => set(() => ({ data })),
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set(() => ({ isAuthenticated })),
}));

export default useSessionStore;
