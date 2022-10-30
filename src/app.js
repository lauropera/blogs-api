const express = require('express');

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');
const routes = require('./routes/router');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(express.json());

app.use(routes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorMiddleware);

module.exports = app;
