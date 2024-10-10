const swaggerAutogen = require('swagger-autogen')();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'Your API Description',
    },
  },
  apis: ['./routes/index'], // path to your API routes
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };