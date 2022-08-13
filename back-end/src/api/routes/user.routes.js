const router = require('express').Router();
const controller = require('../controllers');
const tokenValidation = require('../middlewares/tokenValidation');

router.get('/seller/all', tokenValidation, controller.user.findAllSellers);

module.exports = router;