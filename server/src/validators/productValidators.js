const { z } = require('zod');

const variantSchema = z.object({
  size: z.string().min(1),
  color: z.string().min(1),
  sku: z.string().min(3),
  quantity: z.number().int().min(0),
  lowStockThreshold: z.number().int().min(0).default(3),
});

const productBodySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional().default(''),
  shortDescription: z.string().optional().default(''),
  collection: z.string().min(1),
  category: z.string().min(1),
  tags: z
    .array(z.enum(['casual', 'essentials', 'office', 'weekend', 'luxury', 'minimal', 'bold']))
    .optional()
    .default([]),
  price: z.number().positive(),
  images: z.array(z.string().url()).optional().default([]),
  variants: z.array(variantSchema).min(1),
  featured: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
});

module.exports = { productBodySchema };
