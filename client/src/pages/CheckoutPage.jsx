import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../app/store/authStore';
import { useCartStore } from '../app/store/cartStore';
import { Button } from '../components/common/Button';
import { Loader } from '../components/common/Loader';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';
import { clearCart, fetchCart } from '../services/cartService';
import { addFunds, deductFunds, getWalletBalance } from '../services/walletService';
import { formatKsh } from '../utils/currency';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const setCart = useCartStore((state) => state.setCart);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [message, setMessage] = useState('');

  const cartQuery = useQuery({ queryKey: ['cart'], queryFn: fetchCart });
  const walletQuery = useQuery({
    queryKey: ['wallet-balance', user?.id],
    queryFn: () => getWalletBalance(user.id),
    enabled: Boolean(user?.id),
  });

  const items = (cartQuery.data?.items || []).filter((item) => item?.product);
  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => sum + Number(item?.product?.price || 0) * Number(item?.quantity || 0), 0),
    [items],
  );
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + Number(item?.quantity || 0), 0),
    [items],
  );

  const topUpMutation = useMutation({
    mutationFn: (amount) => addFunds(user.id, amount, 'Checkout wallet top-up'),
    onSuccess: () => {
      setTopUpAmount('');
      setMessage('Wallet topped up successfully.');
      queryClient.invalidateQueries({ queryKey: ['wallet-balance', user?.id] });
    },
    onError: (error) => {
      setMessage(error?.response?.data?.message || error?.message || 'Failed to top up wallet.');
    },
  });

  const placeOrderMutation = useMutation({
    mutationFn: async () => {
      await deductFunds(user.id, subtotal, `Order payment (${totalItems} items)`);
      const nextCart = await clearCart();
      return nextCart;
    },
    onSuccess: (nextCart) => {
      setCart(nextCart || { items: [] });
      setMessage('Order placed successfully. Payment captured from wallet.');
      queryClient.invalidateQueries({ queryKey: ['wallet-balance', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      setMessage(error?.response?.data?.message || error?.message || 'Checkout failed.');
    },
  });

  if (cartQuery.isLoading || walletQuery.isLoading) {
    return <Loader text="Preparing checkout..." />;
  }

  if (cartQuery.isError) {
    return <ErrorState message={cartQuery.error?.response?.data?.message || 'Failed to load cart'} />;
  }

  if (walletQuery.isError) {
    return <ErrorState message={walletQuery.error?.response?.data?.message || 'Failed to load wallet'} />;
  }

  if (!items.length) {
    return (
      <div className="space-y-4">
        <h1 className="font-heading text-3xl text-electricLime sm:text-4xl">Checkout</h1>
        <EmptyState text="Your cart is empty. Add products before checkout." />
        <Link to="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const walletBalance = Number(walletQuery.data || 0);
  const isInsufficient = walletBalance < subtotal;
  const requiredTopUp = Math.max(0, subtotal - walletBalance);

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl text-electricLime sm:text-4xl">Checkout</h1>

      {message && <p className="text-sm text-hotPink">{message}</p>}

      <section className="space-y-3 rounded-2xl border border-vividViolet/20 bg-white/80 p-4">
        <h2 className="font-heading text-xl">Order Summary</h2>
        {items.map((item) => (
          <div
            key={`${item.product._id}-${item.variantId}`}
            className="flex items-start justify-between gap-4 border-t border-black/10 pt-3"
          >
            <div>
              <p className="font-semibold text-ink">{item.product.name}</p>
              <p className="text-xs text-ink/70">Quantity: {item.quantity}</p>
            </div>
            <p className="font-semibold text-hotPink">
              {formatKsh(Number(item.product.price || 0) * Number(item.quantity || 0))}
            </p>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-black/10 pt-3 text-sm">
          <p className="text-ink/80">Items: {totalItems}</p>
          <p className="font-bold text-hotPink">Subtotal: {formatKsh(subtotal)}</p>
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-vividViolet/20 bg-white/80 p-4">
        <h2 className="font-heading text-xl">Wallet Payment</h2>
        <p className="text-sm text-ink/80">Available balance: {formatKsh(walletBalance)}</p>

        {isInsufficient && (
          <div className="space-y-2 rounded-xl bg-hotPink/10 p-3 text-sm">
            <p className="font-semibold text-hotPink">
              Insufficient balance. Add at least {formatKsh(requiredTopUp)} to continue.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="number"
                min="1"
                step="1"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                className="w-full rounded-lg border border-vividViolet/30 px-3 py-2 text-sm"
                placeholder="Top-up amount"
              />
              <Button
                onClick={() => topUpMutation.mutate(Number(topUpAmount || 0))}
                disabled={topUpMutation.isPending || Number(topUpAmount || 0) <= 0}
              >
                {topUpMutation.isPending ? 'Adding...' : 'Add Funds'}
              </Button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={() => placeOrderMutation.mutate()}
            disabled={placeOrderMutation.isPending || isInsufficient || subtotal <= 0}
          >
            {placeOrderMutation.isPending ? 'Placing Order...' : `Pay ${formatKsh(subtotal)}`}
          </Button>
          <Button variant="ghost" onClick={() => navigate('/cart')}>
            Back to Cart
          </Button>
        </div>
      </section>
    </div>
  );
};
