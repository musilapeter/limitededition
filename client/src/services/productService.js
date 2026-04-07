import api from '../lib/axios';

export const fetchProducts = async (params = {}) => {
  const { data } = await api.get('/products', { params });
  return data.data;
};

export const fetchProductDetails = async (slug) => {
  const { data } = await api.get(`/products/${slug}`);
  return data.data;
};

export const fetchLowStockProducts = async () => {
  const { data } = await api.get('/products/low-stock');
  return data.data;
};

export const fetchAdminProducts = async () => {
  const { data } = await api.get('/products/admin/all');
  return data.data;
};
