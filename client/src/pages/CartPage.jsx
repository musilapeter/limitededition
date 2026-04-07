import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '../components/common/Button';
import { Loader } from '../components/common/Loader';
import { EmptyState } from '../components/common/EmptyState';
import { fetchCart, removeCartItem, upsertCartItem } from '../services/cartService';

export const CartPage = () => {
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
  if (!items.length) return <EmptyState text="Your curated rail is empty." />;

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-4xl">Cart</h1>
      {items.map((item) => (
        <div key={`${item.product._id}-${item.variantId}`} className="glass-panel flex flex-wrap items-center justify-between gap-3 rounded-xl p-4">
          <div>
            <p className="font-semibold">{item.product.name}</p>
            <p className="text-sm text-pearl/70">Qty: {item.quantity}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
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
              onClick={() =>
                removeMutation.mutate({ productId: item.product._id, variantId: item.variantId })
              }
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
