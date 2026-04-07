const express = require('express');
const cartController = require('../controllers/cartController');
const { authenticate } = require('../middlewares/auth');
const { validateRequest } = require('../middlewares/validateRequest');
const { upsertCartItemSchema, removeCartItemSchema } = require('../validators/cartValidators');

const router = express.Router();

router.use(authenticate);
router.get('/', cartController.getCart);
router.post('/item', validateRequest(upsertCartItemSchema), cartController.upsertItem);
router.delete('/item', validateRequest(removeCartItemSchema), cartController.removeItem);

module.exports = router;
