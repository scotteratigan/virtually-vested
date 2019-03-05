const router = require('express').Router();
const stockRoutes = require('./stock');
const userRoutes = require('./user');

// Routes
router.use('/stock', stockRoutes);
router.use('/user', userRoutes);

module.exports = router;
