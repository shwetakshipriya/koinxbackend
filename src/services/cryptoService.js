import axios from 'axios';
import CryptoPrice from '../models/CryptoPrice.js';

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';
const SUPPORTED_COINS = ['bitcoin', 'matic-network', 'ethereum'];

export const fetchAndStorePrices = async () => {
  try {
    const coins = SUPPORTED_COINS.join(',');
    const response = await axios.get(`${COINGECKO_API_BASE}/simple/price`, {
      params: {
        ids: coins,
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true
      }
    });

    const pricePromises = SUPPORTED_COINS.map(async (coinId) => {
      const data = response.data[coinId];
      return new CryptoPrice({
        coinId,
        priceUsd: data.usd,
        marketCapUsd: data.usd_market_cap,
        priceChange24h: data.usd_24h_change
      }).save();
    });

    await Promise.all(pricePromises);
    console.log('Crypto prices updated successfully');
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
  }
};

export const getLatestStats = async (coinId) => {
  const stats = await CryptoPrice.findOne(
    { coinId },
    { priceUsd: 1, marketCapUsd: 1, priceChange24h: 1 }
  ).sort({ createdAt: -1 });

  if (!stats) {
    throw new Error('No data found for the specified coin');
  }

  return {
    price: stats.priceUsd,
    marketCap: stats.marketCapUsd,
    '24hChange': stats.priceChange24h
  };
};

export const calculatePriceDeviation = async (coinId) => {
  const prices = await CryptoPrice.find(
    { coinId },
    { priceUsd: 1 }
  )
    .sort({ createdAt: -1 })
    .limit(100);

  if (prices.length === 0) {
    throw new Error('No data found for the specified coin');
  }

  const priceValues = prices.map(p => p.priceUsd);
  const mean = priceValues.reduce((a, b) => a + b) / priceValues.length;
  const squaredDiffs = priceValues.map(price => Math.pow(price - mean, 2));
  const variance = squaredDiffs.reduce((a, b) => a + b) / priceValues.length;
  const deviation = Math.sqrt(variance);

  return { deviation: Number(deviation.toFixed(2)) };
};