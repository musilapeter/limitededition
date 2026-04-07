const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { AppError } = require('../utils/appError');

const ensureCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
};

const validateStock = async (productId, variantId, quantity) => {
  const product = await Product.findById(productId);
  if (!product || !product.isActive) throw new AppError('Product unavailable', 400);

  const variant = product.variants.id(variantId);
  if (!variant) throw new AppError('Variant not found', 404);
  if (quantity > variant.quantity) {
    throw new AppError(`Only ${variant.quantity} left for selected size/color`, 400);
  }

  return { product, variant };
};

const getCart = async (userId) => {
  const cart = await ensureCart(userId);
  return Cart.findById(cart._id).populate('items.product');
};

const upsertCartItem = async (userId, payload) => {
  await validateStock(payload.productId, payload.variantId, payload.quantity);

  const cart = await ensureCart(userId);
  const index = cart.items.findIndex(
    (item) =>
      item.product.toString() === payload.productId && item.variantId.toString() === payload.variantId,
  );

  if (index >= 0) {
    cart.items[index].quantity = payload.quantity;
  } else {
    cart.items.push({
      product: payload.productId,
      variantId: payload.variantId,
      quantity: payload.quantity,
    });
  }

  await cart.save();
  return Cart.findById(cart._id).populate('items.product');
};

const removeCartItem = async (userId, payload) => {
  const cart = await ensureCart(userId);
  cart.items = cart.items.filter(
    (item) =>
      !(item.product.toString() === payload.productId && item.variantId.toString() === payload.variantId),
  );

  await cart.save();
  return Cart.findById(cart._id).populate('items.product');
};

module.exports = { getCart, upsertCartItem, removeCartItem };
