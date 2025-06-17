import { type Badge, type ProductSize, type WeightUnit } from "./enums";
import { ProductComment, ProductLike } from "./product-interaction";
import { User } from "./user";

export type Product = {
  __typename: "Product";
  id: number;
  sku?: string;
  barcode?: string;
  color?: string;
  brand: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  hasOffer: boolean;
  offerPrice: number;
  stock: number;
  isExchangeable: boolean;
  interests: string[];
  isActive: boolean;
  ratings: number;
  ratingCount: number;
  reviewsNumber: number;
  badges: Badge[];
  createdAt: Date;
  updatedAt: Date;
  productCategoryId: number;
  userId: string;
  user?: User;
  productCategory: ProductCategory;
  comments?: ProductComment[];
  likes?: ProductLike[];
};

export type ProductCategory = {
  __typename: "ProductCategory";
  id: number;
  productCategoryName: string;
  departmentCategoryId: number;
  departmentCategory: DepartmentCategory;
  keywords: string[];
  materialImpactEstimateId: number;
  size?: ProductSize;
  minWeight?: number;
  maxWeight?: number;
  weightUnit?: WeightUnit;
};

export type MaterialImpactEstimate = {
  id: number;
  materialType: string;
  minWeight: number;
  maxWeight: number;
  estimatedCo2SavingsKG: number;
  estimatedWaterSavingsLT: number;
  estimatedWasteSavingsKG: number;
  notes: string;
};

export type DepartmentCategory = {
  __typename: "DepartmentCategory";
  id: number;
  departmentCategoryName: string;
  departmentId: number;
  department: Department;
};

export type Department = {
  __typename: "Department";
  id: number;
  departmentName: string;
};
