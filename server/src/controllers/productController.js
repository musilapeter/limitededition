const { asyncHandler } = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');
const productService = require('../services/productService');

const listPublic = asyncHandler(async (req, res) => {
  const data = await productService.listProducts(req.query, false);
  return sendSuccess(res, { data, message: 'Products fetched' });
});

const listAdmin = asyncHandler(async (req, res) => {
  const data = await productService.listProducts(req.query, true);
  return sendSuccess(res, { data, message: 'All products fetched' });
});

const details = asyncHandler(async (req, res) => {
  const data = await productService.getProductBySlug(req.params.slug);
  return sendSuccess(res, { data, message: 'Product fetched' });
});

const create = asyncHandler(async (req, res) => {
  const data = await productService.createProduct(req.body);
  return sendSuccess(res, { statusCode: 201, data, message: 'Product created' });
});

const update = asyncHandler(async (req, res) => {
  const data = await productService.updateProduct(req.params.id, req.body);
  return sendSuccess(res, { data, message: 'Product updated' });
});

const deactivate = asyncHandler(async (req, res) => {
  const data = await productService.deactivateProduct(req.params.id);
  return sendSuccess(res, { data, message: 'Product deactivated' });
});

const remove = asyncHandler(async (req, res) => {
  await productService.removeProduct(req.params.id);
  return sendSuccess(res, { message: 'Product deleted' });
});

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return sendSuccess(res, { statusCode: 400, message: 'No image uploaded' });
  }

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Image uploaded',
    data: {
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
    },
  });
});

const lowStock = asyncHandler(async (req, res) => {
  const data = await productService.getLowStockProducts();
  return sendSuccess(res, { data, message: 'Low stock products fetched' });
});

module.exports = {
  listPublic,
  listAdmin,
  details,
  create,
  update,
  deactivate,
  remove,
  lowStock,
  uploadImage,
};
