import { useQuery } from '@tanstack/react-query';
import { CollectionBanner } from '../components/collections/CollectionBanner';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { fetchCollections } from '../services/collectionService';

export const CollectionsPage = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['collections'], queryFn: fetchCollections });

  if (isLoading) return <Loader text="Loading collections..." />;
  if (isError) return <ErrorState message="Failed to load collections" />;

  return (
    <div className="space-y-6 fade-in">
      <section className="glass-panel rounded-3xl p-5 sm:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-vividViolet">Editorial Curation</p>
        <h1 className="mt-2 font-heading text-3xl text-hotPink sm:text-4xl">Collections</h1>
        <p className="mt-3 max-w-3xl text-sm text-ink/85 sm:text-base">
          Browse seasonal drops built around fit, movement, and premium fabric stories. Each collection is
          intentionally limited and curated for versatility.
        </p>
      </section>

      {!data?.length ? <EmptyState text="No collections available yet." /> : null}

      <div className="space-y-6">
        {data.map((collection) => (
          <CollectionBanner key={collection._id} collection={collection} />
        ))}
      </div>
    </div>
  );
};
