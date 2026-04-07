const express = require('express');
const collectionController = require('../controllers/collectionController');
const { authenticate, authorizeRoles } = require('../middlewares/auth');
const { validateRequest } = require('../middlewares/validateRequest');
const { collectionBodySchema } = require('../validators/collectionValidators');

const router = express.Router();

router.get('/', collectionController.listPublic);
router.get('/admin/all', authenticate, authorizeRoles('admin'), collectionController.listAdmin);
router.post(
  '/',
  authenticate,
  authorizeRoles('admin'),
  validateRequest(collectionBodySchema),
  collectionController.create,
);
router.put(
  '/:id',
  authenticate,
  authorizeRoles('admin'),
  validateRequest(collectionBodySchema),
  collectionController.update,
);
router.delete('/:id', authenticate, authorizeRoles('admin'), collectionController.remove);

module.exports = router;
