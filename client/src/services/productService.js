import api from '../lib/axios';
import { mockProducts } from './mockData';

export const fetchProducts = async (params = {}) => {
  try {
    const { data } = await api.get('/products', { params });
    return data?.data ?? [];
  } catch (_error) {
    if (params.featured) {
      return mockProducts.filter((item) => item.featured);
    }
    return mockProducts;
  }
};

export const fetchProductDetails = async (slug) => {
  try {
    const { data } = await api.get(`/products/${slug}`);
    return data?.data ?? null;
  } catch (_error) {
    return mockProducts.find((item) => item.slug === slug) || null;
  }
};

export const fetchLowStockProducts = async () => {
  const { data } = await api.get('/products/low-stock');
  return data?.data ?? [];
};

export const fetchAdminProducts = async () => {
  const { data } = await api.get('/products/admin/all');
  return data?.data ?? [];
};
