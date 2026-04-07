const mongoose = require('mongoose');
const Product = require('../models/Product');
const InventoryLog = require('../models/InventoryLog');
const { AppError } = require('../utils/appError');

const findVariant = (product, variantId) => {
  const variant = product.variants.id(variantId);
  if (!variant) throw new AppError('Variant not found', 404);
  return variant;
};

const applyInventoryAction = async ({ productId, variantId, action, quantity, reason, actorId }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const product = await Product.findById(productId).session(session);
    if (!product) throw new AppError('Product not found', 404);

    const variant = findVariant(product, variantId);
    const previousQuantity = variant.quantity;
    let newQuantity = previousQuantity;
    let quantityChange = 0;

    if (action === 'add') {
      newQuantity = previousQuantity + quantity;
      quantityChange = quantity;
    } else if (action === 'reduce') {
      if (quantity > previousQuantity) throw new AppError('Cannot reduce below zero', 400);
      newQuantity = previousQuantity - quantity;
      quantityChange = -quantity;
    } else {
      newQuantity = quantity;
      quantityChange = quantity - previousQuantity;
    }

    variant.quantity = newQuantity;
    await product.save({ session });

    await InventoryLog.create(
      [
        {
          product: product._id,
          variantId: variant._id,
          sku: variant.sku,
          action,
          previousQuantity,
          quantityChange,
          newQuantity,
          reason,
          actor: actorId,
        },
      ],
      { session },
    );

    await session.commitTransaction();
    return product;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const listInventoryLogs = async () => {
  return InventoryLog.find()
    .populate('product', 'name slug')
    .populate('actor', 'name email role')
    .sort({ createdAt: -1 });
};

const getInventorySummary = async () => {
  const products = await Product.find({ isActive: true });

  let lowStockCount = 0;
  let outOfStockCount = 0;

  products.forEach((product) => {
    product.variants.forEach((variant) => {
      if (variant.quantity <= 0) outOfStockCount += 1;
      else if (variant.quantity <= variant.lowStockThreshold) lowStockCount += 1;
    });
  });

  return {
    totalProducts: products.length,
    lowStockVariants: lowStockCount,
    outOfStockVariants: outOfStockCount,
  };
};

module.exports = { applyInventoryAction, listInventoryLogs, getInventorySummary };
