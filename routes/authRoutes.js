const Router         = require('express-promise-router');
const router         = Router();
const userController = require('../controllers/userController');
const authHelper     = require('../authHelper');

router.post('/register', userController.RegisterUser);
router.post('/login', authHelper.signIn, authHelper.signJWTForUser);
router.post('/logout', userController.Logout)
router.post('/loginstatus', userController.LoginStatus)

module.exports = router;
