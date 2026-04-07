const { z } = require('zod');

const upsertCartItemSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1),
  quantity: z.number().int().min(1),
});

const removeCartItemSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1),
});

module.exports = { upsertCartItemSchema, removeCartItemSchema };
