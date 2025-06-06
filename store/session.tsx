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
  city: { id: string; city: string };
  county: { id: string; county: string };
  region: { id: string; region: string };
  country: { id: string; country: string };
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
    county: { id: "", county: "" },
    region: { id: "", region: "" },
    country: { id: "", country: "" },
    city: { id: "", city: "" },
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
