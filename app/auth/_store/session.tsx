import { create } from "zustand";

export type UserData = {
  id: string;
  name: string;
  surnames: string;
  email: string;
  businessName: string;
  profileImage: string;
  birthday: string;
  phone: string;
  address: string;
  isCompany: boolean;
  accountType: "FREE" | "PLUS" | "PREMIUM";
  preferredContactMethod: "EMAIL" | "ALL" | "WHATSAPP";
  points: number;
  createdAt: string;
  updatedAt: string;
  city: { id: number; city: string };
  county: { id: number; county: string };
  region: { id: number; region: string };
  country: { id: number; country: string };
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
  edit: boolean;
  toggleEdit: () => void;
};

const useSessionStore = create<SessionStore>((set) => ({
  data: {
    id: "",
    name: "",
    surnames: "",
    businessName: "",
    profileImage: "",
    birthday: "",
    email: "",
    isCompany: false,
    phone: "",
    address: "",
    accountType: "FREE",
    preferredContactMethod: "EMAIL",
    points: 0,
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
  edit: false,
  toggleEdit: () => set((state) => ({ edit: !state.edit })),
}));

export default useSessionStore;
