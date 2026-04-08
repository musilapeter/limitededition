export const mockCollections = [
  {
    _id: 'mock-col-1',
    name: 'Metro Minimal',
    slug: 'metro-minimal',
    description: 'Sharp weekday tailoring in neutral tones for daily city movement.',
    season: 'Spring',
    year: 2026,
    pieces: 18,
    heroImage:
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
  {
    _id: 'mock-col-2',
    name: 'Weekend Atelier',
    slug: 'weekend-atelier',
    description: 'Relaxed statement pieces designed for creative off-duty styling.',
    season: 'Resort',
    year: 2026,
    pieces: 12,
    heroImage:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
  {
    _id: 'mock-col-3',
    name: 'Summer Essentials',
    slug: 'summer-essentials',
    description: 'Breathable staples and clean silhouettes for high-heat days.',
    season: 'Summer',
    year: 2026,
    pieces: 20,
    heroImage:
      'https://images.unsplash.com/photo-1595777707802-21b287e3f01e?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
  {
    _id: 'mock-col-4',
    name: 'Luxury Investment',
    slug: 'luxury-investment',
    description: 'Refined investment wardrobe with premium materials and timeless cuts.',
    season: 'Autumn',
    year: 2026,
    pieces: 14,
    heroImage:
      'https://images.unsplash.com/photo-1551539503-da0cf00a3a3f?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
  {
    _id: 'mock-col-5',
    name: 'Evening Studio',
    slug: 'evening-studio',
    description: 'After-hours edits with elevated drape and polished detailing.',
    season: 'Fall',
    year: 2026,
    pieces: 10,
    heroImage:
      'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
  {
    _id: 'mock-col-6',
    name: 'Winter Core',
    slug: 'winter-core',
    description: 'Cold-season essentials focused on warmth, structure, and layering.',
    season: 'Winter',
    year: 2026,
    pieces: 16,
    heroImage:
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1200&q=80',
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
    collectionSlug: 'metro-minimal',
    price: 149,
    tags: ['office', 'minimal', 'luxury'],
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    ],
    variants: [
      { _id: 'v1', size: 'S', color: 'Sand', quantity: 8, lowStockThreshold: 3 },
      { _id: 'v2', size: 'M', color: 'Sand', quantity: 2, lowStockThreshold: 3 },
      { _id: 'v1b', size: 'L', color: 'Charcoal', quantity: 5, lowStockThreshold: 3 },
    ],
  },
  {
    _id: 'mock-prod-2',
    name: 'Contour Ease Trouser',
    slug: 'contour-ease-trouser',
    shortDescription: 'Fluid taper with structured waist.',
    description: 'A soft-tailored trouser for transitional daily wear.',
    category: 'bottoms',
    collectionSlug: 'weekend-atelier',
    price: 99,
    tags: ['weekend', 'essentials', 'casual'],
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=900&q=80',
    ],
    variants: [
      { _id: 'v3', size: 'M', color: 'Stone', quantity: 4, lowStockThreshold: 2 },
      { _id: 'v4', size: 'L', color: 'Stone', quantity: 1, lowStockThreshold: 2 },
      { _id: 'v4b', size: 'S', color: 'Ebony', quantity: 6, lowStockThreshold: 2 },
    ],
  },
  {
    _id: 'mock-prod-3',
    name: 'Silk Meridian Shirt',
    slug: 'silk-meridian-shirt',
    shortDescription: 'Flowing fabric with subtle collar detail.',
    description: 'Breathable silk blend perfect for layering or standalone wear.',
    category: 'tops',
    collectionSlug: 'summer-essentials',
    price: 79,
    tags: ['essentials', 'lightweight', 'versatile'],
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1516886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    ],
    variants: [
      { _id: 'v5', size: 'XS', color: 'Cream', quantity: 10, lowStockThreshold: 3 },
      { _id: 'v6', size: 'S', color: 'Cream', quantity: 8, lowStockThreshold: 3 },
      { _id: 'v7', size: 'M', color: 'Sage', quantity: 5, lowStockThreshold: 3 },
    ],
  },
  {
    _id: 'mock-prod-4',
    name: 'Curved Canvas Jacket',
    slug: 'curved-canvas-jacket',
    shortDescription: 'Relaxed overfit with reinforced seams.',
    description: 'Durable canvas construction with modern relaxed silhouette.',
    category: 'outerwear',
    collectionSlug: 'luxury-investment',
    price: 189,
    tags: ['statement', 'luxury', 'modern'],
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16ebc5?auto=format&fit=crop&w=900&q=80',
    ],
    variants: [
      { _id: 'v8', size: 'S', color: 'Navy', quantity: 3, lowStockThreshold: 2 },
      { _id: 'v9', size: 'M', color: 'Navy', quantity: 4, lowStockThreshold: 2 },
      { _id: 'v10', size: 'L', color: 'Rust', quantity: 2, lowStockThreshold: 2 },
    ],
  },
  {
    _id: 'mock-prod-5',
    name: 'Minimal Knit Vest',
    slug: 'minimal-knit-vest',
    shortDescription: 'Layering essential in fine knit.',
    description: 'Perfect for transitional seasons, pairs with everything.',
    category: 'tops',
    collectionSlug: 'metro-minimal',
    price: 59,
    tags: ['essentials', 'minimal', 'layering'],
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1505011268255-9ba8d0d470d7?auto=format&fit=crop&w=900&q=80',
    ],
    variants: [
      { _id: 'v11', size: 'XS', color: 'Pearl', quantity: 12, lowStockThreshold: 4 },
      { _id: 'v12', size: 'M', color: 'Pearl', quantity: 9, lowStockThreshold: 4 },
      { _id: 'v13', size: 'L', color: 'Charcoal', quantity: 7, lowStockThreshold: 4 },
    ],
  },
  {
    _id: 'mock-prod-6',
    name: 'Structured Midi Skirt',
    slug: 'structured-midi-skirt',
    shortDescription: 'Crisp lines with A-line silhouette.',
    description: 'Office-ready midi that works for any season.',
    category: 'bottoms',
    collectionSlug: 'evening-studio',
    price: 129,
    tags: ['office', 'midi', 'structured'],
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1585204051170-e3e5e94f9c46?auto=format&fit=crop&w=900&q=80',
    ],
    variants: [
      { _id: 'v14', size: 'S', color: 'Black', quantity: 5, lowStockThreshold: 2 },
      { _id: 'v15', size: 'M', color: 'Black', quantity: 6, lowStockThreshold: 2 },
      { _id: 'v16', size: 'L', color: 'Neutral', quantity: 4, lowStockThreshold: 2 },
    ],
  },
  {
    _id: 'mock-prod-7',
    name: 'Comfort Tech Legging',
    slug: 'comfort-tech-legging',
    shortDescription: 'High-rise with hidden pocket detail.',
    description: 'Moisture-wicking fabric for movement and style.',
    category: 'bottoms',
    collectionSlug: 'winter-core',
    price: 69,
    tags: ['comfort', 'tech', 'everyday'],
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1506629082632-11c7156e50d0?auto=format&fit=crop&w=900&q=80',
    ],
    variants: [
      { _id: 'v17', size: 'XS', color: 'Black', quantity: 11, lowStockThreshold: 5 },
      { _id: 'v18', size: 'M', color: 'Black', quantity: 8, lowStockThreshold: 5 },
      { _id: 'v19', size: 'L', color: 'Sage', quantity: 6, lowStockThreshold: 5 },
    ],
  },
  {
    _id: 'mock-prod-8',
    name: 'Statement Cargos',
    slug: 'statement-cargos',
    shortDescription: 'Functional pockets with fashion-forward cut.',
    description: 'A modern take on cargo pants with utility meets style.',
    category: 'bottoms',
    collectionSlug: 'weekend-atelier',
    price: 119,
    tags: ['statement', 'utilitarian', 'modern'],
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1595777707802-21b287e3f01e?auto=format&fit=crop&w=900&q=80',
    ],
    variants: [
      { _id: 'v20', size: 'S', color: 'Olive', quantity: 4, lowStockThreshold: 2 },
      { _id: 'v21', size: 'M', color: 'Olive', quantity: 5, lowStockThreshold: 2 },
      { _id: 'v22', size: 'L', color: 'Khaki', quantity: 3, lowStockThreshold: 2 },
    ],
  },
  {
    _id: 'mock-prod-9',
    name: 'Linen Dream Dress',
    slug: 'linen-dream-dress',
    shortDescription: 'Effortless linen slip with subtle details.',
    description: 'Summer essential that transitions from day to evening.',
    category: 'dresses',
    collectionSlug: 'summer-essentials',
    price: 139,
    tags: ['summer', 'linen', 'effortless'],
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1595818812422-87e7c3a4f2ce?auto=format&fit=crop&w=900&q=80',
    ],
    variants: [
      { _id: 'v23', size: 'S', color: 'White', quantity: 7, lowStockThreshold: 3 },
      { _id: 'v24', size: 'M', color: 'White', quantity: 6, lowStockThreshold: 3 },
      { _id: 'v25', size: 'L', color: 'Terracotta', quantity: 4, lowStockThreshold: 3 },
    ],
  },
  {
    _id: 'mock-prod-10',
    name: 'Premium Wool Coat',
    slug: 'premium-wool-coat',
    shortDescription: 'Investment piece in sustainable wool blend.',
    description: 'Timeless coat with modern cut, built to last seasons.',
    category: 'outerwear',
    collectionSlug: 'luxury-investment',
    price: 299,
    tags: ['luxury', 'investment', 'sustainable'],
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1551539503-da0cf00a3a3f?auto=format&fit=crop&w=900&q=80',
    ],
    variants: [
      { _id: 'v26', size: 'XS', color: 'Camel', quantity: 2, lowStockThreshold: 1 },
      { _id: 'v27', size: 'M', color: 'Camel', quantity: 3, lowStockThreshold: 1 },
      { _id: 'v28', size: 'L', color: 'Charcoal', quantity: 2, lowStockThreshold: 1 },
    ],
  },
];

export const mockUsers = {
  admin: {
    id: 'mock-admin-1',
    name: 'House Admin',
    email: 'admin@limitededition.com',
    role: 'admin',
    wallet: {
      balance: 0,
      currency: 'KES',
    },
  },
  customer: {
    id: 'mock-customer-1',
    name: 'Nia Muse',
    email: 'customer@limitededition.com',
    role: 'customer',
    wallet: {
      balance: 500.0,
      currency: 'KES',
      transactionHistory: [
        { _id: 't1', amount: 100, type: 'credit', date: '2025-01-15', reason: 'Store credit' },
        { _id: 't2', amount: -50, type: 'debit', date: '2025-01-20', reason: 'Purchase refund' },
      ],
    },
  },
};

export const mockInventorySummary = {
  totalProducts: mockProducts.length,
  lowStockVariants: mockProducts
    .flatMap((item) => item.variants)
    .filter((variant) => variant.quantity > 0 && variant.quantity <= variant.lowStockThreshold).length,
  outOfStockVariants: mockProducts
    .flatMap((item) => item.variants)
    .filter((variant) => variant.quantity <= 0).length,
};

export const mockInventoryLogs = [
  {
    _id: 'log-1',
    sku: 'TDB-M-SAND',
    action: 'reduce',
    previousQuantity: 3,
    quantityChange: -1,
    newQuantity: 2,
    reason: 'Sample sale',
  },
  {
    _id: 'log-2',
    sku: 'CET-L-STONE',
    action: 'adjust',
    previousQuantity: 2,
    quantityChange: -1,
    newQuantity: 1,
    reason: 'Manual audit correction',
  },
];

export const mockCart = {
  user: 'mock-customer-1',
  items: [
    {
      product: mockProducts[0],
      variantId: 'v2',
      quantity: 1,
    },
  ],
};
