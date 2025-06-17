import { Department, DepartmentCategory, Product, ProductCategory } from "@/types/product";
import { User } from "@/types/user";
import { create } from "zustand";

export type BrowseStore = {
  departments: Department[];
  setDepartments: (departments: Department[]) => void;
  selectedDepartment: Department | null;
  setSelectedDepartment: (department: Department | null) => void;
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
  stores: User[];
  setStores: (stores: User[]) => void;
  selectedStore: User | null;
  setSelectedStore: (store: User | null) => void;
};

const useBrowseStore = create<BrowseStore>((set) => ({
  departments: [],
  setDepartments: (departments) => set({ departments }),
  selectedDepartment: null,
  setSelectedDepartment: (department) => set({ selectedDepartment: department }),
  departmentCategories: [],
  setDepartmentCategories: (categories) => set({ departmentCategories: categories }),
  selectedDepartmentCategory: null,
  setSelectedDepartmentCategory: (category) => set({ selectedDepartmentCategory: category }),
  productCategories: [],
  setProductCategories: (categories) => set({ productCategories: categories }),
  selectedProductCategory: null,
  setSelectedProductCategory: (category) => set({ selectedProductCategory: category }),
  products: [],
  setProducts: (products) => set({ products: products }),
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  stores: [],
  setStores: (stores) => set({ stores }),
  selectedStore: null,
  setSelectedStore: (store) => set({ selectedStore: store }),
}));

export default useBrowseStore;
