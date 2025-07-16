import { Product, ProductCategory } from "@/types/product";
import { create } from "zustand";

export type SearchStore = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  productCategories: ProductCategory[];
  setProductCategories: (categories: ProductCategory[]) => void;
  selectedProductCategory: ProductCategory | null;
  setSelectedProductCategory: (category: ProductCategory | null) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
};

const useSearchStore = create<SearchStore>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  productCategories: [],
  setProductCategories: (categories) => set({ productCategories: categories }),
  selectedProductCategory: null,
  setSelectedProductCategory: (category) => set({ selectedProductCategory: category }),
  products: [],
  setProducts: (products) => set({ products }),
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
}));

export default useSearchStore;
