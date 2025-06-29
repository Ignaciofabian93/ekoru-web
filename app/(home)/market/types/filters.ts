import { Badge } from "@/types/enums";

export type Filters = {
  brands: string[];
  minPrice: number | null;
  maxPrice: number | null;
  rating: number | null;
  location: string;
  badges: Badge[];
};
