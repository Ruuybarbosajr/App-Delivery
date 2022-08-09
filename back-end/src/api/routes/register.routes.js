/* registerRouter */
const express = require('express');
const registerUser = require('../controllers/register');
const validateUser = require('../middlewares/validateUser');

const router = express.Router();

router.post('/', validateUser, registerUser);

module.exports = router;