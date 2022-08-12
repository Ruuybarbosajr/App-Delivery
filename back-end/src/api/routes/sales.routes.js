const router = require('express').Router();
const tokenValidation = require('../middlewares/tokenValidation');
const controller = require('../controllers');

router.post('/register', tokenValidation, controller.sales.create);

module.exports = router;
