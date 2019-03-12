const router = require('express').Router();
const userController = require('../../controllers/userController');

// Matches with '/api/user/lkhasdflkjasd'
// `/api/user/token-${user.token}&email-${user.email}`
router.route('/token-:token&email-:email')
  .get(userController.findByToken);
// .post(userController.create);

// Matches with '/api/user/signup'
router
  .route('/signup')
  .post(userController.create);

// Matches with '/api/user/login'
router
  .route('/login')
  .post(userController.logInOrSignUp);

module.exports = router;
