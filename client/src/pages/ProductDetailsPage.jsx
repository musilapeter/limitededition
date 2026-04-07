import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { StockBadge } from '../components/common/StockBadge';
import { Button } from '../components/common/Button';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';
import { limitedMessage } from '../utils/stock';
import { fetchProductDetails } from '../services/productService';
import { upsertCartItem } from '../services/cartService';

export const ProductDetailsPage = () => {
  const { slug } = useParams();
  const [variantId, setVariantId] = useState('');

  const query = useQuery({ queryKey: ['product', slug], queryFn: () => fetchProductDetails(slug) });
  const mutation = useMutation({ mutationFn: upsertCartItem });

  if (query.isLoading) return <Loader text="Loading product details..." />;
  if (query.isError) return <ErrorState message="Product not found" />;

  const product = query.data;
  const selected = product.variants.find((variant) => variant._id === variantId) || product.variants[0];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <img src={product.images?.[0]} alt={product.name} className="h-[520px] w-full rounded-2xl object-cover" />

      <div className="space-y-4">
        <h1 className="font-heading text-5xl">{product.name}</h1>
        <p className="text-pearl/75">{product.description}</p>
        <p className="text-2xl font-bold text-sand">${product.price}</p>

        <div className="space-y-2">
          <label className="text-sm uppercase tracking-widest text-pearl/70">Choose variant</label>
          <select
            className="w-full rounded-lg bg-white/5 p-3"
            value={selected?._id}
            onChange={(e) => setVariantId(e.target.value)}
          >
            {product.variants.map((variant) => (
              <option key={variant._id} value={variant._id}>
                {variant.size} / {variant.color} ({variant.quantity} in stock)
              </option>
            ))}
          </select>
        </div>

        {selected && (
          <div className="flex items-center gap-3">
            <StockBadge variant={selected} />
            {limitedMessage(selected) && <span className="text-rust">{limitedMessage(selected)}</span>}
          </div>
        )}

        <Button
          onClick={() =>
            mutation.mutate({ productId: product._id, variantId: selected._id, quantity: 1 })
          }
          disabled={!selected || selected.quantity === 0 || mutation.isPending}
        >
          {mutation.isPending ? 'Adding...' : 'Add to Cart'}
        </Button>

        {mutation.isError && <ErrorState message={mutation.error?.response?.data?.message || 'Failed'} />}
      </div>
    </div>
  );
};
