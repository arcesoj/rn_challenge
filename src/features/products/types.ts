
export type SortByType = 'price' | 'rating' | 'title' | undefined
export type OrderType = 'asc' | 'desc'

export type ProductApi = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description?: string;
  brand?: string;
  stock?: number;
  rating?: number;
};

export type ProductsResponse = {
  products: ProductApi[];
  total: number;
  skip: number;
  limit: number;
};

export type CategoryApi = string | { slug?: string; name?: string; [k: string]: unknown };
