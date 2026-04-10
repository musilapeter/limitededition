import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProductGrid } from '../components/products/ProductGrid';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';
import { fetchProducts } from '../services/productService';

const WOMEN_CLOTHING_IMAGES = [
  '/w1.webp',
  '/w2.jpg',
  '/w3.webp',
  '/w4.webp',
  '/w5.webp',
  '/w7.jpg',
  '/w8.webp',
  '/w9.jpg',
  '/w10.jpg',
  '/w11.webp',
  '/w12.webp',
  '/w13.avif',
  '/w14.webp',
  '/top1.jpg',
  '/top2.webp',
  '/top3.jpeg',
  '/top4.webp',
  '/top5.webp',
  '/top6.jpg',
  '/top7.webp',
  '/top8.jpg',
];

const TOPS_IMAGES = [
  '/top1.jpg',
  '/top2.webp',
  '/top3.jpeg',
  '/top4.webp',
  '/top5.webp',
  '/top6.jpg',
  '/top7.webp',
  '/top8.jpg',
  '/top9.avif',
  '/top10.avif',
  '/top11.avif',
  '/top12.avif',
  '/top13.avif',
  '/top14.webp',
  '/top 15.jpg',
];

const HERO_CATEGORY_CONFIG = {
  'women-clothing': {
    title: 'Women Clothing',
    description: 'Curated looks for everyday wear, events, and statement moments.',
    productCategories: ['tops', 'bottoms', 'dresses', 'outerwear'],
  },
  'men-clothing': {
    title: 'Men Clothing',
    description: 'Clean cuts and modern staples tailored for effortless dressing.',
    productCategories: ['tops', 'bottoms', 'outerwear'],
  },
  'unisex-clothing': {
    title: 'Unisex Clothing',
    description: 'Versatile pieces designed to fit across styles and seasons.',
    productCategories: ['tops', 'bottoms', 'outerwear'],
  },
  outerwear: {
    title: 'Outerwear',
    description: 'Layer-ready pieces for structure, warmth, and edge.',
    productCategories: ['outerwear'],
  },
  tops: {
    title: 'Tops',
    description: 'Shirts, tees, and elevated tops to anchor your outfits.',
    productCategories: ['tops'],
  },
  bottoms: {
    title: 'Bottoms',
    description: 'Trousers, skirts, and pants with modern silhouettes.',
    productCategories: ['bottoms'],
  },
  dresses: {
    title: 'Dresses',
    description: 'From casual flow to event-ready elegance.',
    productCategories: ['dresses'],
  },
  sportswear: {
    title: 'Sportswear',
    description: 'Performance-inspired essentials for movement and comfort.',
    productCategories: ['bottoms', 'tops'],
  },
  'kids-clothing': {
    title: 'Kids Clothing',
    description: 'Comfortable and practical wardrobe choices for kids.',
    productCategories: ['tops', 'bottoms'],
  },
  shoes: {
    title: 'Shoes',
    description: 'Footwear highlights and style-ready picks.',
    productCategories: ['tops', 'bottoms', 'outerwear', 'dresses'],
  },
  sneakers: {
    title: 'Sneakers',
    description: 'Sneaker-friendly looks to match your rotation.',
    productCategories: ['tops', 'bottoms'],
  },
  'formal-shoes': {
    title: 'Formal Shoes',
    description: 'Polished outfit pairings for office and occasion wear.',
    productCategories: ['outerwear', 'bottoms'],
  },
  boots: {
    title: 'Boots',
    description: 'Boot-compatible outfits for bold seasonal styling.',
    productCategories: ['outerwear', 'bottoms', 'dresses'],
  },
};

export const HeroCategoryPage = () => {
  const { categorySlug } = useParams();
  const config = HERO_CATEGORY_CONFIG[categorySlug] || {
    title: 'Category',
    description: 'Discover curated products in this section.',
    productCategories: [],
  };
  const isKidsCategory = categorySlug === 'kids-clothing';
  const isWomenCategory = categorySlug === 'women-clothing';
  const kidsImages = [
    '/kid1.jpg',
    '/kid2.webp',
    '/kid3.jpg',
    '/kid4.webp',
    '/kid5.webp',
    '/kid6.jpg',
    '/kid7.webp',
    '/kid8.webp',
    '/k4.jpg',
  ];

  const query = useQuery({ queryKey: ['hero-category-products'], queryFn: () => fetchProducts() });

  const products = useMemo(() => {
    const list = query.data || [];
    if (!config.productCategories.length) return list;

    const allowed = new Set(config.productCategories);
    return list.filter((item) => allowed.has(item.category));
  }, [query.data, config.productCategories]);

  const displayProducts = useMemo(() => {
    if (isWomenCategory) {
      return products.slice(0, WOMEN_CLOTHING_IMAGES.length).map((product, index) => ({
        ...product,
        images: [WOMEN_CLOTHING_IMAGES[index % WOMEN_CLOTHING_IMAGES.length]],
      }));
    }

    if (categorySlug === 'tops') {
      return products.map((product, index) => ({
        ...product,
        images: [TOPS_IMAGES[index % TOPS_IMAGES.length]],
      }));
    }

    if (!isKidsCategory) return products;

    return products.slice(0, 18).map((product, index) => ({
      ...product,
      images: [kidsImages[index % kidsImages.length]],
    }));
  }, [isKidsCategory, isWomenCategory, kidsImages, products]);

  if (query.isLoading) return <Loader text="Loading category..." />;
  if (query.isError) return <ErrorState message="Failed to load this category" />;

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-black/10 bg-white p-5">
        <h1 className="mt-2 font-heading text-3xl text-ink sm:text-4xl">{config.title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink/80">{config.description}</p>
        <Link to="/" className="mt-4 inline-block text-sm font-semibold text-vividViolet underline underline-offset-4">
          Back
        </Link>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-2xl text-hotPink">Available Products</h2>
        <ProductGrid products={displayProducts} />
      </section>
    </div>
  );
};
