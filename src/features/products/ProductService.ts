import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductsByCategory, fetchProduct, fetchCategories } from './ProductApi';
import { OrderType, ProductApi, ProductsResponse, SortByType } from './types';
import { 
  mapProductListApiToUI, 
  mapProductApiToUI, 
  mapCategoryListApiToUI 
} from './mappers';
import type { ProductListData, Product, Category } from './ui-types';

const DEFAULT_LIMIT = 20;
const STALE_TIME = 1000 * 60 * 5; // 5 minute

export function useInfiniteProductsQuery(
  limit: number = DEFAULT_LIMIT,
  category?: string,
  sortBy?: SortByType,
  order: OrderType = 'asc'
) {
  return useInfiniteQuery<ProductsResponse, Error, ProductListData>({
    queryKey: ['products', { limit, category: category ?? null, sortBy: sortBy ?? null, order }],
    initialPageParam: 0, // skip starts at 0
    queryFn: ({ pageParam }) =>
      category && category.length > 0
        ? fetchProductsByCategory({ category, limit, skip: pageParam as number, sortBy, order })
        : fetchProducts({ limit, skip: pageParam as number, sortBy, order }),
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((sum, p) => sum + p.products.length, 0);
      return loaded < lastPage.total ? lastPage.skip + lastPage.limit : undefined;
    },
    staleTime: STALE_TIME,
    select: (data) => mapProductListApiToUI(data),
  });
}

export function useProductQuery(id: number) {
  return useQuery<ProductApi, Error, Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: Number.isFinite(id) && id > 0,
    retry: false,
    select: (data) => mapProductApiToUI(data),
  });
}

export function useCategoriesQuery() {
  return useQuery<string[], Error, Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    select: (data) => mapCategoryListApiToUI(data),
  });
}
