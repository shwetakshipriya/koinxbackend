import express from 'express';
import cron from 'node-cron';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import cryptoRoutes from './routes/cryptoRoutes.js';
import { fetchAndStorePrices } from './services/cryptoService.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';




dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', cryptoRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Cryptocurrency Stats API!',
    endpoints: {
      stats: '/api/stats',
      deviation: '/api/deviation',
      documentation: '/api-docs',
    },
  });
});


// Schedule background job to run every 2 hours
cron.schedule('0 */2 * * *', async () => {
  console.log('Running scheduled crypto price update');
  await fetchAndStorePrices();
});

// Initial fetch when server starts
fetchAndStorePrices();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});