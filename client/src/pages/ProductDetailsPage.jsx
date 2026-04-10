import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { StockBadge } from '../components/common/StockBadge';
import { Button } from '../components/common/Button';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';
import { limitedMessage } from '../utils/stock';
import { formatKsh } from '../utils/currency';
import { fetchProductDetails } from '../services/productService';
import { upsertCartItem } from '../services/cartService';

export const ProductDetailsPage = () => {
  const { slug } = useParams();
  const [variantId, setVariantId] = useState('');
  const queryClient = useQueryClient();

  const query = useQuery({ queryKey: ['product', slug], queryFn: () => fetchProductDetails(slug) });
  const mutation = useMutation({
    mutationFn: upsertCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  if (query.isLoading) return <Loader text="Loading product details..." />;
  if (query.isError) return <ErrorState message="Product not found" />;

  const product = query.data;
  if (!product) return <ErrorState message="Product unavailable" />;
  const selected = product.variants.find((variant) => variant._id === variantId) || product.variants[0];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <img
        src={product.images?.[0]}
        alt={product.name}
        className="h-80 w-full rounded-2xl object-cover sm:h-[420px] lg:h-[520px]"
      />

      <div className="space-y-4">
        <h1 className="font-heading text-3xl text-electricLime sm:text-4xl lg:text-5xl">{product.name}</h1>
        <p className="text-ink/80">{product.description}</p>
        <p className="text-2xl font-bold text-hotPink">{formatKsh(product.price)}</p>

        <div className="space-y-2">
          <label className="text-sm uppercase tracking-widest text-cyberTurquoise">Choose variant</label>
          <select
            className="w-full rounded-lg border border-vividViolet/35 bg-white p-3 text-ink"
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
            {limitedMessage(selected) && <span className="text-hotPink">{limitedMessage(selected)}</span>}
          </div>
        )}

        <Button
          onClick={() =>
            mutation.mutate({
              productId: product._id,
              variantId: selected._id,
              quantity: 1,
              productSnapshot: {
                _id: product._id,
                name: product.name,
                slug: product.slug,
                images: product.images,
                price: product.price,
              },
            })
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
