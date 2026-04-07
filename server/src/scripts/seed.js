const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { connectDatabase } = require('../config/db');
const User = require('../models/User');
const Collection = require('../models/Collection');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const InventoryLog = require('../models/InventoryLog');

const seed = async () => {
  await connectDatabase();

  await Promise.all([
    User.deleteMany({}),
    Collection.deleteMany({}),
    Product.deleteMany({}),
    Cart.deleteMany({}),
    InventoryLog.deleteMany({}),
  ]);

  const adminPassword = await bcrypt.hash('Admin123!', 10);
  const customerPassword = await bcrypt.hash('Customer123!', 10);

  const [admin, customer] = await User.create([
    {
      name: 'House Admin',
      email: 'admin@limitededition.com',
      password: adminPassword,
      role: 'admin',
    },
    {
      name: 'Nia Muse',
      email: 'customer@limitededition.com',
      password: customerPassword,
      role: 'customer',
    },
  ]);

  const collections = await Collection.create([
    {
      name: 'Metro Minimal',
      slug: 'metro-minimal',
      description: 'Refined silhouettes for weekday movement.',
      heroImage:
        'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=80',
      sortOrder: 1,
    },
    {
      name: 'Weekend Atelier',
      slug: 'weekend-atelier',
      description: 'Relaxed statement pieces with tactile fabrics.',
      heroImage:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      sortOrder: 2,
    },
  ]);

  const products = await Product.create([
    {
      name: 'Tailored Drift Blazer',
      slug: 'tailored-drift-blazer',
      description: 'A cropped blazer with precise structure and soft drape.',
      shortDescription: 'Cropped structured blazer',
      collection: collections[0]._id,
      category: 'outerwear',
      tags: ['office', 'minimal', 'luxury'],
      price: 149,
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
      ],
      featured: true,
      variants: [
        { size: 'S', color: 'Sand', sku: 'TDB-S-SAND', quantity: 8, lowStockThreshold: 3 },
        { size: 'M', color: 'Sand', sku: 'TDB-M-SAND', quantity: 2, lowStockThreshold: 3 },
        { size: 'L', color: 'Ink', sku: 'TDB-L-INK', quantity: 0, lowStockThreshold: 2 },
      ],
    },
    {
      name: 'Contour Ease Trouser',
      slug: 'contour-ease-trouser',
      description: 'Fluid trouser built for movement from studio to evening.',
      shortDescription: 'Fluid tapered trouser',
      collection: collections[1]._id,
      category: 'bottoms',
      tags: ['weekend', 'casual', 'essentials'],
      price: 99,
      images: [
        'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=900&q=80',
      ],
      featured: true,
      variants: [
        { size: 'M', color: 'Stone', sku: 'CET-M-STONE', quantity: 4, lowStockThreshold: 2 },
        { size: 'L', color: 'Stone', sku: 'CET-L-STONE', quantity: 1, lowStockThreshold: 2 },
      ],
    },
  ]);

  const logs = [];
  products.forEach((product) => {
    product.variants.forEach((variant) => {
      logs.push({
        product: product._id,
        variantId: variant._id,
        sku: variant.sku,
        action: 'add',
        previousQuantity: 0,
        quantityChange: variant.quantity,
        newQuantity: variant.quantity,
        reason: 'Initial seeding',
        actor: admin._id,
      });
    });
  });

  await InventoryLog.insertMany(logs);

  console.log('Seed complete');
  console.log({
    admin: { email: admin.email, password: 'Admin123!' },
    customer: { email: customer.email, password: 'Customer123!' },
  });

  await mongoose.connection.close();
};

seed().catch(async (error) => {
  console.error('Seed failed', error);
  await mongoose.connection.close();
  process.exit(1);
});
