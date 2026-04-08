import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../app/store/authStore';
import { useCartStore } from '../app/store/cartStore';
import { Button } from '../components/common/Button';
import { Loader } from '../components/common/Loader';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';
import { fetchCart, removeCartItem, upsertCartItem } from '../services/cartService';
import { formatKsh } from '../utils/currency';

const getItemKey = (item) => `${item?.product?._id || 'unknown'}-${item?.variantId || 'unknown'}`;

const findVariant = (item) => {
  const variants = item?.product?.variants || [];
  return variants.find((variant) => String(variant._id) === String(item.variantId));
};

export const CartPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setCart = useCartStore((state) => state.setCart);
  const queryClient = useQueryClient();
  const [activeItemKey, setActiveItemKey] = useState('');
  const [feedback, setFeedback] = useState('');

  const query = useQuery({ queryKey: ['cart'], queryFn: fetchCart });

  const updateMutation = useMutation({
    mutationFn: upsertCartItem,
    onSuccess: (data) => {
      setCart(data);
      setFeedback('Cart updated.');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      setFeedback(error?.response?.data?.message || 'Failed to update cart.');
    },
    onSettled: () => {
      setActiveItemKey('');
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeCartItem,
    onSuccess: (data) => {
      setCart(data);
      setFeedback('Item removed from cart.');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      setFeedback(error?.response?.data?.message || 'Failed to remove item.');
    },
    onSettled: () => {
      setActiveItemKey('');
    },
  });

  const items = (query.data?.items || []).filter((item) => item?.product);

  useEffect(() => {
    setCart(query.data || { items: [] });
  }, [query.data, setCart]);

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => sum + Number(item?.product?.price || 0) * Number(item.quantity || 0), 0),
    [items],
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + Number(item?.quantity || 0), 0),
    [items],
  );

  if (query.isLoading) return <Loader text="Loading cart..." />;
  if (query.isError) {
    return <ErrorState message={query.error?.response?.data?.message || 'Failed to load cart'} />;
  }

  if (!items.length) return <EmptyState text="Your curated rail is empty." />;

  const updateItemQuantity = (item, quantity) => {
    const variant = findVariant(item);
    const maxQty = Number(variant?.quantity || Infinity);

    if (quantity > maxQty) {
      setFeedback(`Only ${maxQty} left for selected size/color.`);
      return;
    }

    setActiveItemKey(getItemKey(item));
    updateMutation.mutate({
      productId: item.product._id,
      variantId: item.variantId,
      quantity,
    });
  };

  const removeItem = (item) => {
    setActiveItemKey(getItemKey(item));
    removeMutation.mutate({
      productId: item.product._id,
      variantId: item.variantId,
    });
  };

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-3xl text-electricLime sm:text-4xl">Cart</h1>
      {feedback && <p className="text-sm text-hotPink">{feedback}</p>}
      {items.map((item) => (
        <div
          key={getItemKey(item)}
          className="flex flex-col items-start justify-between gap-3 border-t border-black/10 py-4 sm:flex-row sm:items-center"
        >
          <div>
            <p className="font-semibold">{item.product.name}</p>
            <p className="text-xs text-ink/70">
              {findVariant(item)?.size || 'Size n/a'} / {findVariant(item)?.color || 'Color n/a'}
            </p>
            <p className="text-sm text-cyberTurquoise">Qty: {item.quantity}</p>
            <p className="text-xs text-ink/80">Unit: {formatKsh(item.product.price)}</p>
            <p className="text-sm font-semibold text-hotPink">
              Line total: {formatKsh(Number(item.product.price || 0) * Number(item.quantity || 0))}
            </p>
          </div>
          <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:flex-nowrap">
            <Button
              variant="ghost"
              className="flex-1 sm:flex-none"
              onClick={() => updateItemQuantity(item, item.quantity + 1)}
              disabled={
                activeItemKey === getItemKey(item) ||
                Number(item.quantity || 0) >= Number(findVariant(item)?.quantity || Infinity)
              }
            >
              +
            </Button>
            <Button
              variant="ghost"
              className="flex-1 sm:flex-none"
              onClick={() =>
                item.quantity <= 1 ? removeItem(item) : updateItemQuantity(item, item.quantity - 1)
              }
              disabled={activeItemKey === getItemKey(item)}
            >
              -
            </Button>
            <Button
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => removeItem(item)}
              disabled={activeItemKey === getItemKey(item)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-3 border-t border-black/10 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 text-sm text-ink/80">
          <p>
            Items: <span className="font-bold text-cyberTurquoise">{totalItems}</span>
          </p>
          <p>
            Subtotal: <span className="font-bold text-hotPink">{formatKsh(subtotal)}</span>
          </p>
        </div>
        <Button
          onClick={() => {
            if (!user) {
              navigate('/login', { state: { from: { pathname: '/cart' } } });
              return;
            }

            navigate('/checkout');
          }}
        >
          {user ? 'Proceed to Checkout' : 'Sign In to Checkout'}
        </Button>
      </div>
    </div>
  );
};
