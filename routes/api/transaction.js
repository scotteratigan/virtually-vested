const router = require('express').Router();
const transactionController = require('../../controllers/transactionController');

// Matches with '/api/transactions'
router.route('/:token')
  .get(transactionController.findByToken); // todo: update to findOne

router.route('/').post((req, res) => {
  console.log('routes/api/transaction.js')
  transactionController.attemptTrade(req, res);
});

module.exports = router;
