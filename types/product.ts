export type Department = {
  id: number;
  department: string;
  departmentCategories?: DepartmentCategory[];
};

export type ProductCategory = {
  id: number;
  productCategory: string;
  products?: Product[];
};

export type DepartmentCategory = {
  id: number;
  departmentCategory: string;
  productCategories?: ProductCategory[];
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  hasOffer: boolean;
  offerPrice: number;
  stock: number;
  size: string;
  productCategoryId: number;
  userId: string;
};
