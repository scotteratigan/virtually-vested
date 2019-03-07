const router = require('express').Router();
const userController = require('../../controllers/userController');

// Matches with '/api/user'
router.route('/')
  .get(userController.findAll); // todo: update to findOne
// .post(userController.create);

// Matches with '/api/user/signup'
router
  .route('/signup')
  .post(userController.create);

//   .get(userController.findById)
//   .put(userController.update)
//   .delete(userController.remove);

module.exports = router;
