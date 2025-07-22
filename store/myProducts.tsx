import { Product } from "@/types/product";
import { create } from "zustand";

type MyProductsStore = {
  myProducts: Product[];
  setMyProducts: (products: Product[]) => void;
};

const useMyProductsStore = create<MyProductsStore>((set) => ({
  myProducts: [],
  setMyProducts: (products) => set({ myProducts: products }),
}));

export default useMyProductsStore;
