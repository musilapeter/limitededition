import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProductGrid } from '../components/products/ProductGrid';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';
import { fetchProducts } from '../services/productService';

const freshDropImages = [
  '/w1.webp',
  '/w2.jpg',
  '/w3.webp',
  '/w4.webp',
  '/m7.jpg',
  '/qtq80-7bsDUb.jpeg',
  '/im.jpg',
  '/m2.webp',
  '/m4.webp',
];

export const WhatsNewPage = () => {
  const query = useQuery({ queryKey: ['whats-new-products'], queryFn: () => fetchProducts() });

  const latestProducts = useMemo(() => {
    const list = query.data || [];
    const latest = [...list].reverse();
    const targetCount = 9;

    while (latest.length < targetCount && list.length) {
      const fallback = list[latest.length % list.length];
      latest.push({
        ...fallback,
        _id: `${fallback._id}-fresh-${latest.length + 1}`,
      });
    }

    return latest.slice(0, targetCount).map((product, index) => ({
      ...product,
      images: [freshDropImages[index % freshDropImages.length]],
    }));
  }, [query.data]);

  if (query.isLoading) return <Loader text="Loading what's new..." />;
  if (query.isError) return <ErrorState message="Failed to load latest products" />;

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-black/10 bg-white p-5">
        <p className="text-xs uppercase tracking-[0.25em] text-cyberTurquoise">Fresh Drop</p>
        <h1 className="mt-2 font-heading text-3xl text-ink sm:text-4xl">What's New</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink/80">
          Latest arrivals from current collections. Updated content area for your real launch data.
        </p>
        <Link to="/" className="mt-4 inline-block text-sm font-semibold text-vividViolet underline underline-offset-4">
          Back
        </Link>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-2xl text-hotPink">New Arrivals</h2>
        <ProductGrid products={latestProducts} />
      </section>
    </div>
  );
};
