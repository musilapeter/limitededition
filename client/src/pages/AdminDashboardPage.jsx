import { Link, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AdminSidebar } from '../components/layout/AdminSidebar';
import { Loader } from '../components/common/Loader';
import { Card } from '../components/common/Card';
import { fetchInventorySummary } from '../services/inventoryService';
import { fetchAdminCollections } from '../services/collectionService';
import { fetchLowStockProducts } from '../services/productService';

export const AdminDashboardPage = () => {
  const summaryQuery = useQuery({ queryKey: ['inventory-summary'], queryFn: fetchInventorySummary });
  const collectionsQuery = useQuery({
    queryKey: ['admin-collections'],
    queryFn: fetchAdminCollections,
  });
  const lowStockQuery = useQuery({ queryKey: ['low-stock'], queryFn: fetchLowStockProducts });

  if (summaryQuery.isLoading || collectionsQuery.isLoading || lowStockQuery.isLoading) {
    return <Loader text="Loading admin dashboard..." />;
  }

  const summary = summaryQuery.data;

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />

      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <p className="text-xs text-pearl/70">Total Products</p>
            <h2 className="mt-2 text-3xl font-bold">{summary.totalProducts}</h2>
          </Card>
          <Card>
            <p className="text-xs text-pearl/70">Active Collections</p>
            <h2 className="mt-2 text-3xl font-bold">
              {collectionsQuery.data.filter((item) => item.isActive).length}
            </h2>
          </Card>
          <Card>
            <p className="text-xs text-pearl/70">Low Stock Variants</p>
            <h2 className="mt-2 text-3xl font-bold text-rust">{summary.lowStockVariants}</h2>
          </Card>
          <Card>
            <p className="text-xs text-pearl/70">Out of Stock Variants</p>
            <h2 className="mt-2 text-3xl font-bold text-rust">{summary.outOfStockVariants}</h2>
          </Card>
        </div>

        <Card>
          <div className="flex flex-wrap gap-3">
            <Link className="rounded-full border border-white/20 px-4 py-2 text-sm" to="/admin/products">
              Manage Products
            </Link>
            <Link
              className="rounded-full border border-white/20 px-4 py-2 text-sm"
              to="/admin/collections"
            >
              Manage Collections
            </Link>
            <Link className="rounded-full border border-white/20 px-4 py-2 text-sm" to="/admin/inventory">
              Manage Inventory
            </Link>
          </div>
        </Card>

        <Card>
          <h3 className="mb-3 font-heading text-2xl">Low-Stock Alerts</h3>
          <div className="space-y-2 text-sm">
            {lowStockQuery.data.map((product) => (
              <p key={product._id}>
                {product.name} has limited stock variants.
              </p>
            ))}
            {!lowStockQuery.data.length && <p className="text-pearl/70">No low-stock alerts currently.</p>}
          </div>
        </Card>

        <Outlet />
      </div>
    </div>
  );
};
