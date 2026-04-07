import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { AdminTable } from '../components/common/AdminTable';
import { Loader } from '../components/common/Loader';
import { fetchAdminCollections } from '../services/collectionService';

export const AdminCollectionsPage = () => {
  const query = useQuery({ queryKey: ['admin-collections'], queryFn: fetchAdminCollections });
  if (query.isLoading) return <Loader text="Loading collections..." />;

  const rows = query.data.map((collection) => [
    <Link
      key={`${collection._id}-name`}
      to={`/collections/${collection.slug}`}
      className="text-vividViolet underline underline-offset-4"
    >
      {collection.name}
    </Link>,
    <Link
      key={`${collection._id}-slug`}
      to={`/collections/${collection.slug}`}
      className="text-vividViolet underline underline-offset-4"
    >
      {collection.slug}
    </Link>,
    collection.isActive ? 'Active' : 'Inactive',
  ]);

  return (
    <div className="space-y-3">
      <h2 className="font-heading text-2xl sm:text-3xl">Collection Management</h2>
      <AdminTable headers={['Name', 'Slug', 'State']} rows={rows} />
    </div>
  );
};
