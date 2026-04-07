import { ProductTile } from './ProductTile';

export const ProductGrid = ({ products }) => {
  if (!products?.length) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-8 text-center text-ink/70">
        No products match this style filter.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductTile key={product._id} product={product} />
      ))}
    </div>
  );
};
