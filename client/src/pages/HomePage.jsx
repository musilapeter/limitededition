import { useEffect, useMemo, useState } from 'react';
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
  { label: 'Women Clothing', to: '/hero/category/women-clothing' },
  { label: 'Men Clothing', to: '/hero/category/men-clothing' },
  { label: 'Unisex Clothing', to: '/hero/category/unisex-clothing' },
  { label: 'Outerwear', to: '/hero/category/outerwear' },
  { label: 'Tops', to: '/hero/category/tops' },
  { label: 'Bottoms', to: '/hero/category/bottoms' },
  { label: 'Dresses', to: '/hero/category/dresses' },
  { label: 'Sportswear', to: '/hero/category/sportswear' },
  { label: 'Kids Clothing', to: '/hero/category/kids-clothing' },
  { label: 'Shoes', to: '/hero/category/shoes' },
  { label: 'Sneakers', to: '/hero/category/sneakers' },
  { label: 'Formal Shoes', to: '/hero/category/formal-shoes' },
  { label: 'Boots', to: '/hero/category/boots' },
];

export const HomePage = () => {
  const collectionsQuery = useQuery({ queryKey: ['collections'], queryFn: fetchCollections });
  const featuredQuery = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => fetchProducts({ featured: true }),
  });
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  if (collectionsQuery.isLoading || featuredQuery.isLoading) return <Loader text="Curating the runway..." />;
  if (collectionsQuery.isError || featuredQuery.isError) return <ErrorState message="Failed to load storefront" />;

  const heroSlides = useMemo(() => {
    const collectionSlides = (collectionsQuery.data || []).map((collection) => ({
      id: `collection-${collection._id}`,
      title: collection.name,
      subtitle: `${collection.season || 'Season'} ${collection.year || ''}`.trim(),
      cta: 'Shop Collection',
      ctaTo: `/collections/${collection.slug}`,
      image: collection.heroImage,
    }));

    const productSlides = (featuredQuery.data || []).map((product) => ({
      id: `product-${product._id}`,
      title: product.name,
      subtitle: `${product.shortDescription || product.category} - ${formatKsh(product.price)}`,
      cta: 'Shop Product',
      ctaTo: `/products/${product.slug}`,
      image: product.images?.[0],
    }));

    return [...collectionSlides, ...productSlides].filter((slide) => slide.image).slice(0, 8);
  }, [collectionsQuery.data, featuredQuery.data]);

  useEffect(() => {
    if (heroSlides.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  const safeActiveIndex = heroSlides.length ? activeSlide % heroSlides.length : 0;
  const currentSlide = heroSlides[safeActiveIndex];

  return (
    <div className="space-y-10 fade-in">
      <section className="overflow-hidden rounded-lg border border-black/10 bg-white">
        <div className="grid border-b border-black/10 bg-[#f3f3f3] text-sm font-semibold text-ink md:grid-cols-[310px_1fr]">
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-[#e3343a] px-4 py-3 text-base text-white"
            onClick={() => setIsCategoryMenuOpen((prev) => !prev)}
            aria-expanded={isCategoryMenuOpen}
            aria-controls="hero-mobile-categories"
          >
            <span aria-hidden="true">☰</span>
            Category
            <span aria-hidden="true">▾</span>
          </button>
          <div className="flex items-center gap-8 px-4 py-3 md:px-6">
            <Link to="/hero/whats-new" className="transition hover:text-vividViolet">
              What's New
            </Link>
            <Link to="/hero/flash-sale" className="transition hover:text-vividViolet">
              Flash Sale
            </Link>
          </div>
        </div>

        {isCategoryMenuOpen && (
          <div id="hero-mobile-categories" className="border-b border-black/10 bg-[#f6f6f6] md:hidden">
            <ul>
              {categoryLinks.map((item) => (
                <li key={`mobile-${item.label}`} className="border-b border-black/5 text-[15px]">
                  <Link
                    to={item.to}
                    onClick={() => setIsCategoryMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 transition hover:bg-white hover:text-vividViolet"
                  >
                    <span>{item.label}</span>
                    <span className="text-ink/50">›</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid md:grid-cols-[310px_1fr]">
          <aside className="hidden border-r border-black/10 bg-[#f6f6f6] md:block">
            <ul>
              {categoryLinks.map((item) => (
                <li key={item.label} className="border-b border-black/5 text-[15px]">
                  <Link to={item.to} className="flex items-center justify-between px-4 py-3 transition hover:bg-white hover:text-vividViolet">
                    <span>{item.label}</span>
                    <span className="text-ink/50">›</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <div className="relative overflow-hidden bg-gradient-to-r from-[#f8bfd0] to-[#f5d2df] px-4 py-6 sm:px-6">
            <div className="mb-4 inline-flex items-center gap-4 rounded bg-[#eb5164] px-3 py-2 text-white">
              <span className="text-2xl font-extrabold">Apr 7th-May 3rd</span>
              <span className="text-sm font-semibold opacity-90">Fast Delivery /// Fast Delivery /// Fast Delivery</span>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-white/40 bg-black/15 sm:min-h-[420px]">
              {currentSlide ? (
                <>
                  <img
                    key={currentSlide.id}
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-transparent" />

                  <div className="relative z-10 flex h-full flex-col justify-end gap-3 p-5 text-white sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/90">Auto Rotating Banner</p>
                    <h1 className="max-w-2xl font-heading text-3xl font-extrabold leading-tight sm:text-5xl">
                      {currentSlide.title}
                    </h1>
                    <p className="max-w-xl text-sm text-white/90 sm:text-base">{currentSlide.subtitle}</p>
                    <div className="flex items-center gap-3">
                      <Link
                        to={currentSlide.ctaTo}
                        className="inline-flex rounded-full bg-[#e3343a] px-6 py-2.5 text-sm font-bold text-white"
                      >
                        {currentSlide.cta}
                      </Link>
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                        Slide {safeActiveIndex + 1} / {heroSlides.length}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-ink/70">
                  No banners available.
                </div>
              )}

              {!!heroSlides.length && (
                <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      aria-label={`Show slide ${index + 1}`}
                      onClick={() => setActiveSlide(index)}
                      className={`h-2.5 rounded-full transition ${
                        index === safeActiveIndex ? 'w-7 bg-[#e3343a]' : 'w-2.5 bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#7b2028]">
              <span>Fast Delivery</span>
              <span>///</span>
              <span>Clothes & Shoes Only</span>
              <span>///</span>
              <span>New Banners Auto-scroll</span>
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
