const Router = require('express-promise-router');
let router = Router();
const noteController = require('../controllers/note_controller')

router.route('/')
    .get(noteController.getAll)
    .post(noteController.postOne);

router.route('/:id')
    .get(noteController.getOne)
    .delete(noteController.deleteOne)
    .put(noteController.updateOne);

module.exports = router;

