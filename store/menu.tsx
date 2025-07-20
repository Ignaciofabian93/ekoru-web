import { Department } from "@/types/product";
import { create } from "zustand";

type MenuStore = {
  market: Department[];
  stores: { id: string; businessName: string }[];
  services: { id: string; name: string }[];
  community: { id: string; name: string }[];
  culture: { id: string; name: string }[];
  setMarket: (market: Department[]) => void;
  setStores: (stores: { id: string; businessName: string }[]) => void;
  setServices: (services: { id: string; name: string }[]) => void;
  setCommunity: (community: { id: string; name: string }[]) => void;
  setCulture: (culture: { id: string; name: string }[]) => void;
};

const useMenuStore = create<MenuStore>((set) => ({
  market: [],
  stores: [],
  services: [],
  community: [],
  culture: [],
  setMarket: (market) => set({ market }),
  setStores: (stores) => set({ stores }),
  setServices: (services) => set({ services }),
  setCommunity: (community) => set({ community }),
  setCulture: (culture) => set({ culture }),
}));

export default useMenuStore;
