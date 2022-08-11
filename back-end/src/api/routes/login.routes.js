const router = require('express').Router();
const controller = require('../controllers');
const loginBodyValidation = require('../middlewares/loginBodyValidation');

router.post('/', loginBodyValidation, controller.login.signIn);

module.exports = router;
