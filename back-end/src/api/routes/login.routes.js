const controller = require('../controllers');
const loginBodyValidation = require('../middlewares/loginBodyValidation');
const router =  require('express').Router();


router.post('/', loginBodyValidation, controller.login.signIn);

module.exports = router;