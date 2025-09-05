import { http } from '../../api/client';
import { CategoryApi, OrderType, ProductApi, ProductsResponse, SortByType } from './types';

export async function fetchProducts(params: {
  limit: number;
  skip: number;
  sortBy?: SortByType;
  order?: OrderType;
}): Promise<ProductsResponse> {
  const { limit, skip, sortBy, order } = params;
  const searchParams: Record<string, string> = { 
    limit: String(limit), 
    skip: String(skip) 
  };
  if (sortBy) searchParams.sortBy = sortBy;
  if (order) searchParams.order = order;
  
  const queryString = Object.entries(searchParams)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  
  return http<ProductsResponse>(`/products?${queryString}`);
}

export async function fetchProduct(id: number): Promise<ProductApi> {
  return http<ProductApi>(`/products/${id}`);
}

export async function fetchProductsByCategory(params: {
  category: string;
  limit: number;
  skip: number;
  sortBy?: SortByType;
  order?: OrderType;
}): Promise<ProductsResponse> {
  const { category, limit, skip, sortBy, order } = params;
  const searchParams: Record<string, string> = { 
    limit: String(limit), 
    skip: String(skip) 
  };
  if (sortBy) searchParams.sortBy = sortBy;
  if (order) searchParams.order = order;
  
  const queryString = Object.entries(searchParams)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  
  const encoded = encodeURIComponent(category);
  return http<ProductsResponse>(`/products/category/${encoded}?${queryString}`);
}

export async function fetchCategories(): Promise<string[]> {
  const data = await http<CategoryApi[]>('/products/categories');
  return (data || [])
    .map(item => {
      if (typeof item === 'string') return item;
      if (item && typeof item === 'object') {
        const name = (item as any).name ?? (item as any).slug;
        if (typeof name === 'string') return name as string;
      }
      return undefined;
    })
    .filter((v): v is string => typeof v === 'string' && v.length > 0);
}
