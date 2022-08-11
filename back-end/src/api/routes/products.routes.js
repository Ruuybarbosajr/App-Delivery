const controller = require('../controllers');
const tokenValidation = require('../middlewares/tokenValidation');
const router =  require('express').Router();

router.get('/', tokenValidation, controller.products.getAll)

module.exports = router;