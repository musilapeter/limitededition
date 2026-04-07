import { useQuery } from '@tanstack/react-query';
import { AdminTable } from '../components/common/AdminTable';
import { Loader } from '../components/common/Loader';
import { fetchAdminProducts } from '../services/productService';

export const AdminProductsPage = () => {
  const query = useQuery({ queryKey: ['admin-products'], queryFn: fetchAdminProducts });
  if (query.isLoading) return <Loader text="Loading products..." />;

  const rows = query.data.map((product) => [
    product.name,
    product.category,
    `$${product.price}`,
    product.isActive ? 'Active' : 'Inactive',
    String(product.variants.length),
  ]);

  return (
    <div className="space-y-3">
      <h2 className="font-heading text-2xl sm:text-3xl">Product Management</h2>
      <AdminTable headers={['Name', 'Category', 'Price', 'State', 'Variants']} rows={rows} />
    </div>
  );
};
