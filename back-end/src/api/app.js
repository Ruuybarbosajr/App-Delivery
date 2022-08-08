const express = require('express');
const registerUser = require('../controllers/register');
const validateUser = require('../middleware/validateUser');

const app = express();
app.use(express.json());


app.get('/coffee', (_req, res) => res.status(418).end());

app.post('/register', validateUser, registerUser);


module.exports = app;
