const router = require('express').Router();
const controller = require('../controllers');
const tokenValidation = require('../middlewares/tokenValidation');

router.get('/', tokenValidation, controller.products.getAll);

module.exports = router;
