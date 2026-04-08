import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProductGrid } from '../components/products/ProductGrid';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';
import { fetchProducts } from '../services/productService';

export const FlashSalePage = () => {
  const query = useQuery({ queryKey: ['flash-sale-products'], queryFn: () => fetchProducts({ featured: true }) });

  const saleProducts = useMemo(() => {
    const list = query.data || [];
    return list.slice(0, 9);
  }, [query.data]);

  if (query.isLoading) return <Loader text="Loading flash sale..." />;
  if (query.isError) return <ErrorState message="Failed to load flash sale" />;

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-black/10 bg-white p-5">
        <p className="text-xs uppercase tracking-[0.25em] text-cyberTurquoise">Limited Window</p>
        <h1 className="mt-2 font-heading text-3xl text-ink sm:text-4xl">Flash Sale</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink/80">
          Time-sensitive promotions area ready for your real campaign and discounts.
        </p>
        <Link to="/" className="mt-4 inline-block text-sm font-semibold text-vividViolet underline underline-offset-4">
          Back to Home Hero
        </Link>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-2xl text-hotPink">Flash Picks</h2>
        <ProductGrid products={saleProducts} />
      </section>
    </div>
  );
};
