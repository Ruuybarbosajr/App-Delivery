const controller = require('../controllers');
const registerBodyValidation = require('../middlewares/registerBodyValidation');
const router =  require('express').Router();

router.post('/', registerBodyValidation, controller.register.create);

module.exports = router;