import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductGrid } from '../components/products/ProductGrid';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';
import { fetchProducts } from '../services/productService';

const STOCK_OPTIONS = [
  { label: 'All', value: '' },
  { label: 'In Stock', value: 'in_stock' },
  { label: 'Out of Stock', value: 'out_of_stock' },
];

export const ProductsPage = () => {
  const [filters, setFilters] = useState({ category: '', stock: '', size: '', color: '', tags: '' });

  const query = useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
  });

  const categories = useMemo(() => {
    const list = query.data?.map((item) => item.category) || [];
    return [...new Set(list)];
  }, [query.data]);

  if (query.isLoading) return <Loader text="Building your style rail..." />;
  if (query.isError) return <ErrorState message="Failed to load products" />;

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-4xl">Style Browse</h1>

      <div className="grid gap-3 rounded-2xl border border-white/10 p-4 md:grid-cols-5">
        <select
          className="rounded-lg bg-white/5 p-2"
          value={filters.category}
          onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <input
          className="rounded-lg bg-white/5 p-2"
          placeholder="Size (M)"
          value={filters.size}
          onChange={(e) => setFilters((prev) => ({ ...prev, size: e.target.value }))}
        />

        <input
          className="rounded-lg bg-white/5 p-2"
          placeholder="Color (Sand)"
          value={filters.color}
          onChange={(e) => setFilters((prev) => ({ ...prev, color: e.target.value }))}
        />

        <input
          className="rounded-lg bg-white/5 p-2"
          placeholder="Tag (minimal)"
          value={filters.tags}
          onChange={(e) => setFilters((prev) => ({ ...prev, tags: e.target.value }))}
        />

        <select
          className="rounded-lg bg-white/5 p-2"
          value={filters.stock}
          onChange={(e) => setFilters((prev) => ({ ...prev, stock: e.target.value }))}
        >
          {STOCK_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <ProductGrid products={query.data || []} />
    </div>
  );
};
