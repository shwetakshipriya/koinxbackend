import mongoose from 'mongoose';

const cryptoPriceSchema = new mongoose.Schema(
  {
    coinId: {
      type: String,
      required: [true, 'Coin ID is required'],
      enum: {
        values: ['bitcoin', 'matic-network', 'ethereum'],
        message: 'Invalid coin ID',
      },
    },
    priceUsd: {
      type: Number,
      required: [true, 'Price in USD is required'],
    },
    marketCapUsd: {
      type: Number,
      required: [true, 'Market Cap in USD is required'],
    },
    priceChange24h: {
      type: Number,
      required: [true, '24h price change is required'],
    },
  },
  { timestamps: true }
);

// Index for faster queries
cryptoPriceSchema.index({ coinId: 1, createdAt: -1 });

const CryptoPrice = mongoose.model('CryptoPrice', cryptoPriceSchema);

export default CryptoPrice;