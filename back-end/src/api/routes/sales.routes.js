const router = require('express').Router();
const tokenValidation = require('../middlewares/tokenValidation');
const saleBodyValidation = require('../middlewares/saleBodyValidation');
const controller = require('../controllers');

router.post('/register', tokenValidation, saleBodyValidation, controller.sales.create);
router.patch('/:id/update', tokenValidation, controller.sales.updateStatus);
router.get('/all', tokenValidation, controller.sales.getAll);
router.get('/:id', tokenValidation, controller.sales.findOne);

module.exports = router;
