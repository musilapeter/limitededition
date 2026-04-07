import { useQuery } from '@tanstack/react-query';
import { CollectionBanner } from '../components/collections/CollectionBanner';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';
import { fetchCollections } from '../services/collectionService';

export const CollectionsPage = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['collections'], queryFn: fetchCollections });

  if (isLoading) return <Loader text="Loading collections..." />;
  if (isError) return <ErrorState message="Failed to load collections" />;

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl text-hotPink sm:text-4xl">Collections</h1>
      <div className="space-y-6">
        {data.map((collection) => (
          <CollectionBanner key={collection._id} collection={collection} />
        ))}
      </div>
    </div>
  );
};
