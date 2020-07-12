const Router         = require('express-promise-router');
let router           = Router();
const noteController = require('../controllers/noteController');
const cors           = require('cors');
const authMiddleWare = require('../authHelper');

// Require authentication middleware for all routes
router.use(cors(), authMiddleWare.requireJWT);

router.route('/')
    .get(noteController.getAll)
    .post(noteController.postOne);

router.route('/:id')
    .get(noteController.getOne)
    .delete(noteController.deleteOne)
    .put(noteController.updateOne);

module.exports = router;
