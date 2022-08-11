const router = require('express').Router();
const controller = require('../controllers');
const registerBodyValidation = require('../middlewares/registerBodyValidation');

router.post('/', registerBodyValidation, controller.register.create);

module.exports = router;
