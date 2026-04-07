import { useQuery } from '@tanstack/react-query';
import { AdminTable } from '../components/common/AdminTable';
import { Loader } from '../components/common/Loader';
import { fetchAdminCollections } from '../services/collectionService';

export const AdminCollectionsPage = () => {
  const query = useQuery({ queryKey: ['admin-collections'], queryFn: fetchAdminCollections });
  if (query.isLoading) return <Loader text="Loading collections..." />;

  const rows = query.data.map((collection) => [
    collection.name,
    collection.slug,
    collection.isActive ? 'Active' : 'Inactive',
  ]);

  return (
    <div className="space-y-3">
      <h2 className="font-heading text-3xl">Collection Management</h2>
      <AdminTable headers={['Name', 'Slug', 'State']} rows={rows} />
    </div>
  );
};
