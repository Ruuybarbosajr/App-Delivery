const router = require('express').Router();
const controller = require('../controllers');

router.get('/:file', controller.images.getImage);

module.exports = router;