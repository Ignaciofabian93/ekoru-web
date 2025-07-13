import { User } from "@/types/user";
import { create } from "zustand";

export type StoreListStore = {
  stores: User[];
  setStores: (stores: User[]) => void;
  selectedStore: User | null;
  setSelectedStore: (store: User | null) => void;
};

const useStoreListStore = create<StoreListStore>((set) => ({
  stores: [],
  setStores: (stores) => set({ stores }),
  selectedStore: null,
  setSelectedStore: (store) => set({ selectedStore: store }),
}));

export default useStoreListStore;
