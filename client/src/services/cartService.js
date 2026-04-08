import api from '../lib/axios';
import { mockCart, mockProducts } from './mockData';

const GUEST_CART_KEY = 'le_guest_cart';

const loadGuestCart = () => {
  const raw = localStorage.getItem(GUEST_CART_KEY);
  if (!raw) return { ...mockCart, items: [...mockCart.items] };

  try {
    const parsed = JSON.parse(raw);
    return { ...parsed, items: parsed.items || [] };
  } catch (_error) {
    return { ...mockCart, items: [...mockCart.items] };
  }
};

const saveGuestCart = (cart) => {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
};

const hasAuthToken = () => Boolean(localStorage.getItem('le_token'));

let localCart = loadGuestCart();

export const fetchCart = async () => {
  if (!hasAuthToken()) return localCart;

  try {
    const { data } = await api.get('/cart');
    return data.data;
  } catch (_error) {
    return localCart;
  }
};

export const upsertCartItem = async (payload) => {
  if (!hasAuthToken()) {
    const index = localCart.items.findIndex(
      (item) => item.product._id === payload.productId && item.variantId === payload.variantId,
    );

    if (index >= 0) {
      localCart.items[index].quantity = payload.quantity;
    } else {
      const product =
        payload.productSnapshot || mockProducts.find((item) => item._id === payload.productId);

      if (product) {
        localCart.items.push({
          product,
          variantId: payload.variantId,
          quantity: payload.quantity,
        });
      }
    }

    saveGuestCart(localCart);
    return localCart;
  }

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

    saveGuestCart(localCart);
    return localCart;
  }
};

export const removeCartItem = async (payload) => {
  if (!hasAuthToken()) {
    localCart = {
      ...localCart,
      items: localCart.items.filter(
        (item) => !(item.product._id === payload.productId && item.variantId === payload.variantId),
      ),
    };
    saveGuestCart(localCart);
    return localCart;
  }

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
    saveGuestCart(localCart);
    return localCart;
  }
};

export const clearCart = async () => {
  const cart = await fetchCart();
  const items = cart?.items || [];

  if (!items.length) {
    return cart;
  }

  let latest = cart;
  for (const item of items) {
    latest = await removeCartItem({
      productId: item.product._id,
      variantId: item.variantId,
    });
  }

  return latest;
};

