const { asyncHandler } = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');
const cartService = require('../services/cartService');

const getCart = asyncHandler(async (req, res) => {
  const data = await cartService.getCart(req.user._id);
  return sendSuccess(res, { data, message: 'Cart fetched' });
});

const upsertItem = asyncHandler(async (req, res) => {
  const data = await cartService.upsertCartItem(req.user._id, req.body);
  return sendSuccess(res, { data, message: 'Cart updated' });
});

const removeItem = asyncHandler(async (req, res) => {
  const data = await cartService.removeCartItem(req.user._id, req.body);
  return sendSuccess(res, { data, message: 'Item removed from cart' });
});

module.exports = { getCart, upsertItem, removeItem };
