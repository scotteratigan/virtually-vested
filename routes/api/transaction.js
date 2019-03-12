const router = require('express').Router();
const transactionController = require('../../controllers/transactionController');

// Matches with '/api/transactions'
router.route('/:token')
  .get(transactionController.findByToken); // todo: update to findOne
// .post(userController.create);

module.exports = router;
