import api from '../lib/axios';

export const fetchCart = async () => {
  const { data } = await api.get('/cart');
  return data.data;
};

export const upsertCartItem = async (payload) => {
  const { data } = await api.post('/cart/item', payload);
  return data.data;
};

export const removeCartItem = async (payload) => {
  const { data } = await api.delete('/cart/item', { data: payload });
  return data.data;
};
