const mongoose = require('mongoose');

const inventoryLogSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    variantId: { type: mongoose.Schema.Types.ObjectId, required: true },
    sku: { type: String, required: true, trim: true },
    action: {
      type: String,
      enum: ['add', 'reduce', 'adjust'],
      required: true,
    },
    previousQuantity: { type: Number, required: true, min: 0 },
    quantityChange: { type: Number, required: true },
    newQuantity: { type: Number, required: true, min: 0 },
    reason: { type: String, default: '' },
    actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('InventoryLog', inventoryLogSchema);
