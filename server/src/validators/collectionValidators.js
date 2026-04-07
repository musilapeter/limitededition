const { z } = require('zod');

const collectionBodySchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(120),
  description: z.string().max(600).optional().default(''),
  heroImage: z.string().url().optional().or(z.literal('')).default(''),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
});

module.exports = { collectionBodySchema };
