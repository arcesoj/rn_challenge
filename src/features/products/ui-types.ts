/**
 * UI-specific types that represent the data structure needed by React components.
 * These types are optimized for UI consumption and may differ from API types.
 */

export interface Product {
  id: number;
  title: string;
  price: number;
  formattedPrice: string;
  thumbnail: string;
  description?: string;
  brand?: string;
  stock?: number;
  rating?: number;
  hasStock: boolean;
  isAvailable: boolean;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
  hasMore: boolean;
}

export interface Category {
  id: string;
  name: string;
  displayName: string;
}

export interface ProductListData {
  pages: ProductListResponse[];
  pageParams: unknown[];
}
