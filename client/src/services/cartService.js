import api from '../lib/axios';
import { mockCart, mockProducts } from './mockData';

let localCart = { ...mockCart, items: [...mockCart.items] };

export const fetchCart = async () => {
  try {
    const { data } = await api.get('/cart');
    return data.data;
  } catch (_error) {
    return localCart;
  }
};

export const upsertCartItem = async (payload) => {
  try {
    const { data } = await api.post('/cart/item', payload);
    return data.data;
  } catch (_error) {
    const index = localCart.items.findIndex(
      (item) => item.product._id === payload.productId && item.variantId === payload.variantId,
    );

    if (index >= 0) {
      localCart.items[index].quantity = payload.quantity;
    } else {
      const product = mockProducts.find((item) => item._id === payload.productId);
      if (product) {
        localCart.items.push({
          product,
          variantId: payload.variantId,
          quantity: payload.quantity,
        });
      }
    }

    return localCart;
  }
};

export const removeCartItem = async (payload) => {
  try {
    const { data } = await api.delete('/cart/item', { data: payload });
    return data.data;
  } catch (_error) {
    localCart = {
      ...localCart,
      items: localCart.items.filter(
        (item) => !(item.product._id === payload.productId && item.variantId === payload.variantId),
      ),
    };
    return localCart;
  }
};
