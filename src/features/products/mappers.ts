import type { InfiniteData } from '@tanstack/react-query';
import { formatCurrency } from '../../utils/currency';
import type { ProductApi, ProductsResponse, CategoryApi } from './types';
import type { Product, ProductListResponse, Category, ProductListData } from './ui-types';

/**
 * Maps a single product from API format to UI format
 */
export function mapProductApiToUI(apiProduct: ProductApi): Product {
  return {
    id: apiProduct.id,
    title: apiProduct.title || 'Untitled Product',
    price: apiProduct.price || 0,
    formattedPrice: formatCurrency(apiProduct.price || 0),
    thumbnail: apiProduct.thumbnail || '',
    description: apiProduct.description,
    brand: apiProduct.brand,
    stock: apiProduct.stock,
    rating: apiProduct.rating,
    hasStock: (apiProduct.stock || 0) > 0,
    isAvailable: (apiProduct.stock || 0) > 0 && apiProduct.price > 0,
  };
}

/**
 * Maps a product list response from API format to UI format
 */
export function mapProductListResponseApiToUI(apiResponse: ProductsResponse): ProductListResponse {
  return {
    products: apiResponse.products.map(mapProductApiToUI),
    total: apiResponse.total || 0,
    skip: apiResponse.skip || 0,
    limit: apiResponse.limit || 0,
    hasMore: (apiResponse.skip + apiResponse.limit) < apiResponse.total,
  };
}

/**
 * Maps infinite query data from API format to UI format
 */
export function mapProductListApiToUI(
  data: InfiniteData<ProductsResponse, unknown>
): ProductListData {
  return {
    pages: data.pages.map(mapProductListResponseApiToUI),
    pageParams: data.pageParams,
  };
}

/**
 * Maps a category from API format to UI format
 */
export function mapCategoryApiToUI(apiCategory: CategoryApi, index: number): Category {
  if (typeof apiCategory === 'string') {
    return {
      id: apiCategory,
      name: apiCategory,
      displayName: formatCategoryName(apiCategory),
    };
  }

  const name = apiCategory.slug || apiCategory.name || `category-${index}`;
  return {
    id: name,
    name: name,
    displayName: formatCategoryName(apiCategory.name || name),
  };
}

/**
 * Maps a list of categories from API format to UI format
 */
export function mapCategoryListApiToUI(apiCategories: CategoryApi[]): Category[] {
  return apiCategories
    .map((category, index) => mapCategoryApiToUI(category, index))
    .filter(category => category.name.length > 0);
}

/**
 * Helper function to format category names for display
 */
function formatCategoryName(name: string): string {
  return name
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
