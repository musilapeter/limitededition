const express = require('express');
const inventoryController = require('../controllers/inventoryController');
const { authenticate, authorizeRoles } = require('../middlewares/auth');
const { validateRequest } = require('../middlewares/validateRequest');
const { inventoryActionSchema } = require('../validators/inventoryValidators');

const router = express.Router();

router.get('/summary', authenticate, authorizeRoles('admin'), inventoryController.summary);
router.get('/logs', authenticate, authorizeRoles('admin'), inventoryController.logs);
router.post(
  '/adjust',
  authenticate,
  authorizeRoles('admin'),
  validateRequest(inventoryActionSchema),
  inventoryController.updateStock,
);

module.exports = router;
