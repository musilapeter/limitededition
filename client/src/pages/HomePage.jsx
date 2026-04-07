import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CollectionBanner } from '../components/collections/CollectionBanner';
import { ProductGrid } from '../components/products/ProductGrid';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';
import { fetchCollections } from '../services/collectionService';
import { fetchProducts } from '../services/productService';

export const HomePage = () => {
  const collectionsQuery = useQuery({ queryKey: ['collections'], queryFn: fetchCollections });
  const featuredQuery = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => fetchProducts({ featured: true }),
  });

  if (collectionsQuery.isLoading || featuredQuery.isLoading) return <Loader text="Curating the runway..." />;
  if (collectionsQuery.isError || featuredQuery.isError) return <ErrorState message="Failed to load storefront" />;

  return (
    <div className="space-y-10 fade-in">
      <section className="rounded-3xl border border-hotPink/40 bg-hero-glow p-5 sm:p-8">
        <p className="pulse-subtitle text-xs uppercase tracking-[0.4em]">Clothline House</p>
        <h1 className="pulse-title mt-4 max-w-3xl font-heading text-3xl leading-tight sm:text-4xl md:text-6xl">
          Curated silhouettes for modern movement.
        </h1>
        <p className="mt-4 max-w-2xl text-ink/90">
          LimitedEdition is a collection-driven clothline storefront where each drop is deliberate,
          stocked with precision, and designed around mood.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-block rounded-full bg-vividViolet px-6 py-3 text-sm font-bold text-white"
        >
          Explore Pieces
        </Link>
      </section>

      {collectionsQuery.data?.[0] && <CollectionBanner collection={collectionsQuery.data[0]} />}

      <section className="pulse-section-light space-y-4 rounded-3xl p-5 sm:p-8">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
          <h2 className="font-heading text-2xl text-hotPink sm:text-3xl">Featured Pieces</h2>
          <Link to="/collections" className="text-sm text-vividViolet underline underline-offset-4">
            View all collections
          </Link>
        </div>
        <ProductGrid products={featuredQuery.data || []} />
      </section>
    </div>
  );
};
