import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../app/store/authStore';
import { Button } from '../components/common/Button';
import { Loader } from '../components/common/Loader';
import { EmptyState } from '../components/common/EmptyState';
import { fetchCart, removeCartItem, upsertCartItem } from '../services/cartService';
import { formatKsh } from '../utils/currency';

export const CartPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ['cart'], queryFn: fetchCart });

  const updateMutation = useMutation({
    mutationFn: upsertCartItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const removeMutation = useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  if (query.isLoading) return <Loader text="Loading cart..." />;

  const items = query.data?.items || [];
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item?.product?.price || 0) * Number(item.quantity || 0),
    0,
  );

  if (!items.length) return <EmptyState text="Your curated rail is empty." />;

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-3xl text-electricLime sm:text-4xl">Cart</h1>
      {items.map((item) => (
        <div
          key={`${item.product._id}-${item.variantId}`}
          className="flex flex-col items-start justify-between gap-3 border-t border-black/10 py-4 sm:flex-row sm:items-center"
        >
          <div>
            <p className="font-semibold">{item.product.name}</p>
            <p className="text-sm text-cyberTurquoise">Qty: {item.quantity}</p>
          </div>
          <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:flex-nowrap">
            <Button
              variant="ghost"
              className="flex-1 sm:flex-none"
              onClick={() =>
                updateMutation.mutate({
                  productId: item.product._id,
                  variantId: item.variantId,
                  quantity: item.quantity + 1,
                })
              }
            >
              +
            </Button>
            <Button
              variant="ghost"
              className="flex-1 sm:flex-none"
              onClick={() =>
                updateMutation.mutate({
                  productId: item.product._id,
                  variantId: item.variantId,
                  quantity: Math.max(1, item.quantity - 1),
                })
              }
            >
              -
            </Button>
            <Button
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() =>
                removeMutation.mutate({ productId: item.product._id, variantId: item.variantId })
              }
            >
              Remove
            </Button>
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-3 border-t border-black/10 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink/80">
          Subtotal: <span className="font-bold text-hotPink">{formatKsh(subtotal)}</span>
        </p>
        <Button
          onClick={() => {
            if (!user) {
              navigate('/login', { state: { from: { pathname: '/cart' } } });
              return;
            }

            // Placeholder until checkout page is implemented.
            window.alert('Checkout flow is next. You are signed in and ready to proceed.');
          }}
        >
          {user ? 'Proceed to Checkout' : 'Sign In to Checkout'}
        </Button>
      </div>
    </div>
  );
};
