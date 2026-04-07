const express = require('express');
const productController = require('../controllers/productController');
const { authenticate, authorizeRoles } = require('../middlewares/auth');
const { validateRequest } = require('../middlewares/validateRequest');
const { productBodySchema } = require('../validators/productValidators');
const { uploadImage } = require('../middlewares/upload');

const router = express.Router();

router.get('/', productController.listPublic);
router.get('/low-stock', authenticate, authorizeRoles('admin'), productController.lowStock);
router.get('/admin/all', authenticate, authorizeRoles('admin'), productController.listAdmin);
router.get('/:slug', productController.details);
router.post(
  '/',
  authenticate,
  authorizeRoles('admin'),
  validateRequest(productBodySchema),
  productController.create,
);
router.put(
  '/:id',
  authenticate,
  authorizeRoles('admin'),
  validateRequest(productBodySchema),
  productController.update,
);
router.patch('/:id/deactivate', authenticate, authorizeRoles('admin'), productController.deactivate);
router.post(
  '/:id/image',
  authenticate,
  authorizeRoles('admin'),
  uploadImage.single('image'),
  productController.uploadImage,
);
router.delete('/:id', authenticate, authorizeRoles('admin'), productController.remove);

module.exports = router;
