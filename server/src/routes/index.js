const express = require('express');
const authRoutes = require('./authRoutes');
const collectionRoutes = require('./collectionRoutes');
const productRoutes = require('./productRoutes');
const inventoryRoutes = require('./inventoryRoutes');
const cartRoutes = require('./cartRoutes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API healthy' });
});

router.use('/auth', authRoutes);
router.use('/collections', collectionRoutes);
router.use('/products', productRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/cart', cartRoutes);

module.exports = router;
