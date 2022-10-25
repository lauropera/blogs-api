const express = require('express');
const errorMiddleware = require('./middlewares/error');
const routes = require('./routes/router');

const app = express();

app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

module.exports = app;
