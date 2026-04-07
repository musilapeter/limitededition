const { z } = require('zod');

const inventoryActionSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1),
  action: z.enum(['add', 'reduce', 'adjust']),
  quantity: z.number().int().min(0),
  reason: z.string().max(200).optional().default(''),
});

module.exports = { inventoryActionSchema };
