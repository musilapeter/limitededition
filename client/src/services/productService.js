import api from '../lib/axios';
import { mockProducts } from './mockData';

const shouldUseMockData =
  import.meta.env.VITE_USE_MOCK_DATA === 'true' || !import.meta.env.VITE_API_BASE_URL;

export const fetchProducts = async (params = {}) => {
  if (shouldUseMockData) {
    if (params.featured) {
      return mockProducts.filter((item) => item.featured);
    }
    return mockProducts;
  }

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
  if (shouldUseMockData) return mockProducts.find((item) => item.slug === slug) || null;

  try {
    const { data } = await api.get(`/products/${slug}`);
    return data?.data ?? null;
  } catch (_error) {
    return mockProducts.find((item) => item.slug === slug) || null;
  }
};

export const fetchLowStockProducts = async () => {
  if (shouldUseMockData) {
    return mockProducts.filter((product) =>
      product.variants.some(
        (variant) => variant.quantity > 0 && variant.quantity <= variant.lowStockThreshold,
      ),
    );
  }

  try {
    const { data } = await api.get('/products/low-stock');
    return data?.data ?? [];
  } catch (_error) {
    return mockProducts.filter((product) =>
      product.variants.some(
        (variant) => variant.quantity > 0 && variant.quantity <= variant.lowStockThreshold,
      ),
    );
  }
};

export const fetchAdminProducts = async () => {
  if (shouldUseMockData) return mockProducts;

  try {
    const { data } = await api.get('/products/admin/all');
    return data?.data ?? [];
  } catch (_error) {
    return mockProducts;
  }
};
