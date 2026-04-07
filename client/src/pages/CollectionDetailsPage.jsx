import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';
import { ProductGrid } from '../components/products/ProductGrid';
import { fetchCollectionBySlug } from '../services/collectionService';
import { fetchProducts } from '../services/productService';

export const CollectionDetailsPage = () => {
  const { slug } = useParams();

  const collectionQuery = useQuery({
    queryKey: ['collection', slug],
    queryFn: () => fetchCollectionBySlug(slug),
  });

  const productsQuery = useQuery({
    queryKey: ['collection-products', slug],
    queryFn: () => fetchProducts(),
  });

  if (collectionQuery.isLoading || productsQuery.isLoading) {
    return <Loader text="Loading collection..." />;
  }

  if (collectionQuery.isError || productsQuery.isError || !collectionQuery.data) {
    return <ErrorState message="Collection not found" />;
  }

  const collection = collectionQuery.data;
  const products = (productsQuery.data || []).filter((item) => item.collectionSlug === collection.slug);

  return (
    <div className="space-y-8 fade-in">
      <section
        className="relative overflow-hidden rounded-3xl border border-vividViolet/15 p-6 sm:p-8"
        style={{
          backgroundImage: `linear-gradient(160deg, rgba(255,255,255,.86), rgba(245,245,245,.9)), url(${collection.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <p className="text-xs uppercase tracking-[0.35em] text-vividViolet">Collection</p>
        <h1 className="mt-2 font-heading text-3xl text-hotPink sm:text-4xl">{collection.name}</h1>
        <p className="mt-3 max-w-2xl text-sm text-ink/85 sm:text-base">{collection.description}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-ink/80">
          <span className="rounded-full bg-white/85 px-3 py-1">{collection.season} {collection.year}</span>
          <span className="rounded-full bg-white/85 px-3 py-1">{collection.pieces} pieces</span>
        </div>
        <Link to="/collections" className="mt-6 inline-block text-sm text-vividViolet underline underline-offset-4">
          Back to all collections
        </Link>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl text-electricLime sm:text-3xl">Pieces in this collection</h2>
        <ProductGrid products={products} />
      </section>
    </div>
  );
};
