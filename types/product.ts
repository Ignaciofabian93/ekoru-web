import { type Badge, type ProductSize, type WeightUnit } from "./enums";
import { ProductComment, ProductLike } from "./product-interaction";
import { User } from "./user";

export type Product = {
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
  productCategory?: ProductCategory;
  comments?: ProductComment[];
  likes?: ProductLike[];
};

export type ProductCategory = {
  id: number;
  productCategory: string;
  departmentCategoryId: number;
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
  id: number;
  departmentCategory: string;
};

export type Department = {
  id: number;
  department: string;
};
