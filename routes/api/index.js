const router = require('express').Router();
const stockRoutes = require('./stock');
const userRoutes = require('./user');
const transactionRoutes = require('./transaction');

// Routes
router.use('/stock', stockRoutes.router);
router.use('/user', userRoutes);
router.use('/transactions', transactionRoutes);

module.exports = router;
