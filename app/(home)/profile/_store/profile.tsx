import { Product } from "@/types/product";
import { User } from "@/types/user";
import { create } from "zustand";

type ProfileStore = {
  user: User;
  setUser: (user: User) => void;
  loadingProducts: boolean;
  setLoadingProducts: (loading: boolean) => void;
  myProducts: Product[];
  setMyProducts: (products: Product[]) => void;
  selectedProduct?: Product | null;
  setSelectedProduct?: (product: Product | null) => void;
};

const useProfileStore = create<ProfileStore>((set) => ({
  user: {} as User,
  setUser: (user) => set({ user }),
  loadingProducts: false,
  setLoadingProducts: (loading) => set({ loadingProducts: loading }),
  myProducts: [],
  setMyProducts: (products) => set({ myProducts: products }),
}));

export default useProfileStore;
