import express from 'express';
import { param, query, validationResult } from 'express-validator';
import * as cryptoService from '../services/cryptoService.js';

const router = express.Router();

const validateCoin = query('coin')
  .isIn(['bitcoin', 'matic-network', 'ethereum'])
  .withMessage('Invalid coin specified');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get('/stats',
  validateCoin,
  handleValidationErrors,
  async (req, res) => {
    try {
      const stats = await cryptoService.getLatestStats(req.query.coin);
      res.json(stats);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
);

router.get('/deviation',
  validateCoin,
  handleValidationErrors,
  async (req, res) => {
    try {
      const deviation = await cryptoService.calculatePriceDeviation(req.query.coin);
      res.json(deviation);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
);

export default router;