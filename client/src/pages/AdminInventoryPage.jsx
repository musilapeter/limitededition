import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { InventoryTable } from '../components/inventory/InventoryTable';
import { Button } from '../components/common/Button';
import { Loader } from '../components/common/Loader';
import { fetchAdminProducts } from '../services/productService';
import { adjustInventory, fetchInventoryLogs } from '../services/inventoryService';

const schema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1),
  action: z.enum(['add', 'reduce', 'adjust']),
  quantity: z.coerce.number().int().min(0),
  reason: z.string().max(200).optional().default(''),
});

export const AdminInventoryPage = () => {
  const queryClient = useQueryClient();
  const productsQuery = useQuery({ queryKey: ['admin-products'], queryFn: fetchAdminProducts });
  const logsQuery = useQuery({ queryKey: ['inventory-logs'], queryFn: fetchInventoryLogs });

  const { register, handleSubmit, watch, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { action: 'add', quantity: 0 },
  });

  const selectedProductId = watch('productId');
  const selectedProduct = productsQuery.data?.find((product) => product._id === selectedProductId);

  const mutation = useMutation({
    mutationFn: adjustInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory-logs'] });
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['inventory-summary'] });
      reset({ action: 'add', quantity: 0, reason: '' });
    },
  });

  if (productsQuery.isLoading || logsQuery.isLoading) return <Loader text="Loading inventory tools..." />;

  return (
    <div className="space-y-6">
      <div className="py-2">
        <h2 className="mb-4 font-heading text-2xl sm:text-3xl">Inventory Management</h2>
        <form className="grid gap-3 md:grid-cols-5" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
          <select className="w-full rounded-lg border border-black/10 bg-white p-2 text-ink" {...register('productId')}>
            <option value="">Product</option>
            {productsQuery.data.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>

          <select className="w-full rounded-lg border border-black/10 bg-white p-2 text-ink" {...register('variantId')}>
            <option value="">Variant</option>
            {selectedProduct?.variants.map((variant) => (
              <option key={variant._id} value={variant._id}>
                {variant.sku} ({variant.size}/{variant.color})
              </option>
            ))}
          </select>

          <select className="w-full rounded-lg border border-black/10 bg-white p-2 text-ink" {...register('action')}>
            <option value="add">Add</option>
            <option value="reduce">Reduce</option>
            <option value="adjust">Adjust</option>
          </select>

          <input
            type="number"
            className="w-full rounded-lg border border-black/10 bg-white p-2 text-ink"
            {...register('quantity')}
          />
          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? 'Saving...' : 'Apply'}
          </Button>

          <input
            className="md:col-span-5 rounded-lg border border-black/10 bg-white p-2 text-ink"
            placeholder="Reason"
            {...register('reason')}
          />
        </form>
      </div>

      <InventoryTable logs={logsQuery.data} />
    </div>
  );
};
