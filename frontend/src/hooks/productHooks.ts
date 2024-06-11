import { useQuery } from '@tanstack/react-query';

import apiClient from '../apiClient';
import { Product } from '../types/Product';

interface PostQuery {
  page: number;
  pageSize: number;
}
export const useGetProductsQuery = (query?: PostQuery) =>
  useQuery({
    queryKey: ['products', query],
    queryFn: async () => (await apiClient.get<Product[]>(`api/products`)).data,
  });

export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: ['products', slug],
    queryFn: async () =>
      (await apiClient.get<Product>(`api/products/slug/${slug}`)).data,
  });

export const useGetCategoriesQuery = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () =>
      (await apiClient.get<[]>(`/api/products/categories`)).data,
  });

export const useGetProductsByCategoryQuery = (category: string) =>
  useQuery({
    queryKey: ['products', category],
    queryFn: async () =>
      (await apiClient.get<Product[]>(`api/products/category/${category}`))
        .data,
  });
