const express = require('express');
const { loginController } = require('../controllers/login.controller');
const validBodyLogin = require('../middlewares/validBodyLogin');

const router = express.Router();

router.post('/', validBodyLogin, loginController);

module.exports = router;