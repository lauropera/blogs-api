require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const app = require('./app');

const swaggerDocs = require('./swagger.json');

const port = process.env.API_PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log('ouvindo porta', port));
