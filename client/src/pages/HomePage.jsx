import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CollectionBanner } from '../components/collections/CollectionBanner';
import { ProductGrid } from '../components/products/ProductGrid';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';
import { fetchCollections } from '../services/collectionService';
import { fetchProducts } from '../services/productService';
import { formatKsh } from '../utils/currency';

const categoryLinks = [
  'Kili Featured',
  'TV, Audio & Video',
  'Shoes',
  'Phones & Accessories',
  'Home & Kitchen',
  'Health & Beauty',
  'Appliances',
  'Bags',
  'Computers & Accessories',
  'Clothes',
  'Watches & Jewellery',
  'Kids & Baby Products',
  'Automotive',
];

export const HomePage = () => {
  const collectionsQuery = useQuery({ queryKey: ['collections'], queryFn: fetchCollections });
  const featuredQuery = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => fetchProducts({ featured: true }),
  });

  if (collectionsQuery.isLoading || featuredQuery.isLoading) return <Loader text="Curating the runway..." />;
  if (collectionsQuery.isError || featuredQuery.isError) return <ErrorState message="Failed to load storefront" />;

  const heroProducts = (featuredQuery.data || []).slice(0, 2);

  return (
    <div className="space-y-10 fade-in">
      <section className="overflow-hidden rounded-lg border border-black/10 bg-white">
        <div className="grid border-b border-black/10 bg-[#f3f3f3] text-sm font-semibold text-ink md:grid-cols-[310px_1fr]">
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-[#e3343a] px-4 py-3 text-base text-white"
          >
            <span aria-hidden="true">☰</span>
            Category
            <span aria-hidden="true">▾</span>
          </button>
          <div className="flex items-center gap-8 px-4 py-3 md:px-6">
            <button type="button">What's New</button>
            <button type="button">Flash Sale</button>
          </div>
        </div>

        <div className="grid md:grid-cols-[310px_1fr]">
          <aside className="hidden border-r border-black/10 bg-[#f6f6f6] md:block">
            <ul>
              {categoryLinks.map((item) => (
                <li key={item} className="flex items-center justify-between border-b border-black/5 px-4 py-3 text-[15px]">
                  <span>{item}</span>
                  <span className="text-ink/50">›</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="relative overflow-hidden bg-gradient-to-r from-[#f8bfd0] to-[#f5d2df] px-4 py-6 sm:px-6">
            <div className="mb-4 inline-flex items-center gap-4 rounded bg-[#eb5164] px-3 py-2 text-white">
              <span className="text-2xl font-extrabold">Apr 7th-May 3rd</span>
              <span className="text-sm font-semibold opacity-90">Fast Delivery /// Fast Delivery /// Fast Delivery</span>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
              <div className="space-y-3 pb-2">
                <h1 className="font-heading text-4xl font-extrabold leading-tight text-black drop-shadow-sm sm:text-6xl">
                  Women's
                  <br />
                  Fashion Sale
                </h1>
                <p className="inline-block rounded-md bg-black px-4 py-2 text-lg font-semibold text-white sm:text-2xl">
                  Trend Now, Wear in 7
                </p>
                <div>
                  <Link
                    to="/products"
                    className="inline-flex rounded-full bg-[#e3343a] px-6 py-2.5 text-sm font-bold text-white"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {heroProducts.map((product) => (
                  <article key={product._id} className="rounded-md border border-white/40 bg-white/95 p-2 shadow-sm">
                    <h3 className="mb-2 line-clamp-1 px-1 text-center font-semibold text-ink">{product.name}</h3>
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="h-44 w-full rounded object-cover"
                    />
                    <div className="mt-2 flex items-center justify-between rounded bg-[#fff200] px-2 py-1.5 font-bold text-black">
                      <span className="text-xs text-ink/50 line-through">{formatKsh(Number(product.price) * 1.8)}</span>
                      <span className="text-2xl">{formatKsh(product.price)}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {collectionsQuery.data?.[0] && <CollectionBanner collection={collectionsQuery.data[0]} />}

      <section className="pulse-section-light space-y-4 px-1 py-5 sm:py-8">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
          <h2 className="font-heading text-2xl text-hotPink sm:text-3xl">Featured Pieces</h2>
          <Link to="/collections" className="text-sm text-vividViolet underline underline-offset-4">
            View all collections
          </Link>
        </div>
        <ProductGrid products={featuredQuery.data || []} />
      </section>
    </div>
  );
};
