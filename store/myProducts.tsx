import { Product } from "@/types/product";
import { create } from "zustand";

type MyProductsStore = {
  myProducts: Product[];
  setMyProducts: (products: Product[]) => void;
  myProductsLoading: boolean;
  setMyProductsLoading: (loading: boolean) => void;
};

const useMyProductsStore = create<MyProductsStore>((set) => ({
  myProducts: [],
  setMyProducts: (products) => set({ myProducts: products }),
  myProductsLoading: false,
  setMyProductsLoading: (loading) => set({ myProductsLoading: loading }),
}));

export default useMyProductsStore;
