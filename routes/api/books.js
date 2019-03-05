/*
const router = require('express').Router();
const userController = require('../../controllers/userController');

console.log('Book routes loaded');

// Matches with '/api/books'
// THIS IS WHAT MAKES THE MAGIC HAPPEN:
router.route('/')
  .get(userController.findAll)
  .post(userController.create);

// Matches with '/api/books/:id'
router
  .route('/:id')
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
*/
