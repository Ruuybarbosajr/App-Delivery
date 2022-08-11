const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const handleError = require('./middlewares/handleError');


const app = express();

app.use(express.json());
app.use(cors());

app.use('/login', routes.login);
app.use('/register', routes.register);
app.use('/products', routes.products);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(handleError);

module.exports = app;
