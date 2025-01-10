import express from 'express';
import cron from 'node-cron';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import cryptoRoutes from './routes/cryptoRoutes.js';
import { fetchAndStorePrices } from './services/cryptoService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', cryptoRoutes);

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