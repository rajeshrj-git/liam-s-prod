export type ProductCategory = "laptop" | "desktop" | "accessory";
export type ProductCondition = "good" | "fair" | "normal";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  original_price: number | null;
  condition: ProductCondition;
  is_sold: boolean;
  color: string | null;
  processor: string | null;
  ram: string | null;
  storage: string | null;
  display: string | null;
  graphics: string | null;
  battery: string | null;
  os: string | null;
  description: string | null;
  images: string[];
  is_featured: boolean;
  is_available: boolean;
  stock_count: number;
  created_at: string;
  updated_at: string;
}
