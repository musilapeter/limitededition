const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema(
  {
    size: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    sku: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0, default: 0 },
    lowStockThreshold: { type: Number, required: true, min: 0, default: 3 },
  },
  { _id: true },
);

variantSchema.virtual('stockStatus').get(function stockStatus() {
  if (this.quantity <= 0) return 'out_of_stock';
  if (this.quantity <= this.lowStockThreshold) return 'low_stock';
  return 'in_stock';
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, default: '' },
    shortDescription: { type: String, default: '' },
    collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true },
    category: { type: String, required: true, trim: true },
    tags: {
      type: [String],
      enum: ['casual', 'essentials', 'office', 'weekend', 'luxury', 'minimal', 'bold'],
      default: [],
    },
    price: { type: Number, required: true, min: 0 },
    images: { type: [String], default: [] },
    variants: { type: [variantSchema], default: [] },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    suppressReservedKeysWarning: true,
  },
);

productSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
