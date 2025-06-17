import { Department, DepartmentCategory, Product, ProductCategory } from "@/types/product";
import { create } from "zustand";

export type SearchStore = {
  departments: Department[];
  setDepartments: (departments: Department[]) => void;
  selectedDepartment: Department | null;
  setSelectedDepartment: (department: Department | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  departmentCategories: DepartmentCategory[];
  setDepartmentCategories: (categories: DepartmentCategory[]) => void;
  selectedDepartmentCategory: DepartmentCategory | null;
  setSelectedDepartmentCategory: (category: DepartmentCategory | null) => void;
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
  departments: [],
  setDepartments: (departments) => set({ departments }),
  selectedDepartment: null,
  setSelectedDepartment: (department) => set({ selectedDepartment: department }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  departmentCategories: [],
  setDepartmentCategories: (categories) => set({ departmentCategories: categories }),
  selectedDepartmentCategory: null,
  setSelectedDepartmentCategory: (category) => set({ selectedDepartmentCategory: category }),
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
