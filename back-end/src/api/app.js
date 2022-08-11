const express = require('express');
const cors = require('cors');
const loginRuter = require('./routes/login.routes');
const handleError = require('./middlewares/handleError');
const registerRouter = require('./routes/register.routes');

const app = express();
app.use(express.json());

app.use(cors());
app.use('/login', loginRuter);
app.use('/register', registerRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(handleError);

module.exports = app;
