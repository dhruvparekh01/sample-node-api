const Router         = require('express-promise-router');
const router         = Router();
const userController = require('../controllers/UserController');
const authHelper     = require('../authHelper');

router.post('/register', userController.RegisterUser);
router.post('/login', authHelper.signIn, authHelper.signJWTForUser);
router.post('/logout', userController.Logout)

module.exports = router;
