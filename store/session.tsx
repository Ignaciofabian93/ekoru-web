import { create } from "zustand";

export type UserData = {
  id: string;
  name: string;
  surnames: string;
  email: string;
  phone: string;
  address: string;
  city: { id: number; city: string };
  county: { id: number; county: string };
  region: { id: number; region: string };
  country: { id: number; country: string };
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
    surnames: "",
    email: "",
    isCompany: false,
    phone: "",
    address: "",
    county: { id: 0, county: "" },
    region: { id: 0, region: "" },
    country: { id: 0, country: "" },
    city: { id: 0, city: "" },
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
