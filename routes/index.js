const express = require('express');
const router = express.Router();

router.use('/notes', require('./note-routes'));

module.exports = router;