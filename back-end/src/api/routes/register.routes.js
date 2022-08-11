const express = require('express');
const controller = require('../controllers');
const validBodyRegister = require('../middlewares/validBodyRegister');

const router = express.Router();

router.post('/', validBodyRegister, controller.register.create);

module.exports = router;