const express = require('express');
const controller = require('../controllers');
const validBodyLogin = require('../middlewares/validBodyLogin');

const router = express.Router();

router.post('/', validBodyLogin, controller.login.signIn);

module.exports = router;