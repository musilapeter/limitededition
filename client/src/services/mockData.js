export const mockCollections = [
  {
    _id: 'mock-col-1',
    name: 'Metro Minimal',
    slug: 'metro-minimal',
    description: 'Sharp weekday silhouettes with restrained palettes.',
    heroImage:
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
  {
    _id: 'mock-col-2',
    name: 'Weekend Atelier',
    slug: 'weekend-atelier',
    description: 'Soft statement pieces for slower, expressive days.',
    heroImage:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
];

export const mockProducts = [
  {
    _id: 'mock-prod-1',
    name: 'Tailored Drift Blazer',
    slug: 'tailored-drift-blazer',
    shortDescription: 'Cropped structure, fluid shoulder line.',
    description: 'A directional blazer cut for movement and layered styling.',
    category: 'outerwear',
    price: 149,
    tags: ['office', 'minimal', 'luxury'],
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    ],
    variants: [
      { _id: 'v1', size: 'S', color: 'Sand', quantity: 8, lowStockThreshold: 3 },
      { _id: 'v2', size: 'M', color: 'Sand', quantity: 2, lowStockThreshold: 3 },
    ],
  },
  {
    _id: 'mock-prod-2',
    name: 'Contour Ease Trouser',
    slug: 'contour-ease-trouser',
    shortDescription: 'Fluid taper with structured waist.',
    description: 'A soft-tailored trouser for transitional daily wear.',
    category: 'bottoms',
    price: 99,
    tags: ['weekend', 'essentials', 'casual'],
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=900&q=80',
    ],
    variants: [
      { _id: 'v3', size: 'M', color: 'Stone', quantity: 4, lowStockThreshold: 2 },
      { _id: 'v4', size: 'L', color: 'Stone', quantity: 1, lowStockThreshold: 2 },
    ],
  },
];
