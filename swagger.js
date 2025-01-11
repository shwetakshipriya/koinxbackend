import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Crypto Stats API',
    version: '1.0.0',
    description: 'API to fetch cryptocurrency stats and price deviations',
  },
  servers: [
    {
      url: 'https://coin-api-kltk.onrender.com/api',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;