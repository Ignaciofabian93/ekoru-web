import { create } from "zustand";

export type UserData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  county: string;
  region: string;
  isCompany: boolean;
  createdAt: string;
  updatedAt: string;
  userCategory: {
    id: string;
    name: string;
    categoryDiscountAmount: number;
    pointsThreshold: number;
  };
};

type SessionStore = {
  data: UserData;
  handleSession: (data: UserData) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const useSessionStore = create<SessionStore>((set) => ({
  data: {
    id: "",
    name: "",
    email: "",
    isCompany: false,
    phone: "",
    address: "",
    city: "",
    county: "",
    region: "",
    createdAt: "",
    updatedAt: "",
    userCategory: {
      id: "",
      name: "",
      categoryDiscountAmount: 0,
      pointsThreshold: 0,
    },
  },
  handleSession: (data: UserData) => set(() => ({ data })),
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set(() => ({ isAuthenticated })),
}));

export default useSessionStore;
