import mongoose from 'mongoose';

const cryptoPriceSchema = new mongoose.Schema({
  coinId: {
    type: String,
    required: true,
    enum: ['bitcoin', 'matic-network', 'ethereum']
  },
  priceUsd: {
    type: Number,
    required: true
  },
  marketCapUsd: {
    type: Number,
    required: true
  },
  priceChange24h: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Index for faster queries
cryptoPriceSchema.index({ coinId: 1, createdAt: -1 });

const CryptoPrice = mongoose.model('CryptoPrice', cryptoPriceSchema);

export default CryptoPrice;