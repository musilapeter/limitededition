const Product = require('../models/Product');
const { AppError } = require('../utils/appError');

const buildPublicFilters = (query) => {
  const filter = { isActive: true };

  if (query.category) filter.category = query.category;
  if (query.collection) filter.collection = query.collection;
  if (query.featured === 'true') filter.featured = true;
  if (query.tags) filter.tags = { $in: query.tags.split(',') };
  if (query.color) filter['variants.color'] = query.color;
  if (query.size) filter['variants.size'] = query.size;
  if (query.stock === 'in_stock') filter['variants.quantity'] = { $gt: 0 };
  if (query.stock === 'out_of_stock') filter['variants.quantity'] = 0;

  return filter;
};

const listProducts = async (query = {}, includeInactive = false) => {
  const filter = includeInactive ? {} : buildPublicFilters(query);

  return Product.find(filter)
    .populate('collection')
    .sort({ featured: -1, createdAt: -1 });
};

const getProductBySlug = async (slug) => {
  const product = await Product.findOne({ slug, isActive: true }).populate('collection');
  if (!product) throw new AppError('Product not found', 404);
  return product;
};

const createProduct = async (payload) => {
  const exists = await Product.findOne({ slug: payload.slug.toLowerCase() });
  if (exists) throw new AppError('Product slug already exists', 409);

  return Product.create({ ...payload, slug: payload.slug.toLowerCase() });
};

const updateProduct = async (id, payload) => {
  const updated = await Product.findByIdAndUpdate(
    id,
    { ...payload, slug: payload.slug?.toLowerCase() },
    { new: true, runValidators: true },
  );

  if (!updated) throw new AppError('Product not found', 404);
  return updated;
};

const deactivateProduct = async (id) => {
  const updated = await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
  if (!updated) throw new AppError('Product not found', 404);
  return updated;
};

const removeProduct = async (id) => {
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) throw new AppError('Product not found', 404);
  return deleted;
};

const getLowStockProducts = async () => {
  const products = await Product.find({ isActive: true });
  return products.filter((product) =>
    product.variants.some((variant) => variant.quantity > 0 && variant.quantity <= variant.lowStockThreshold),
  );
};

module.exports = {
  listProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deactivateProduct,
  removeProduct,
  getLowStockProducts,
};
