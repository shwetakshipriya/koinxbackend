import express from 'express';
import { query, validationResult } from 'express-validator';
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

/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Get the latest data of a cryptocurrency
 *     parameters:
 *       - in: query
 *         name: coin
 *         schema:
 *           type: string
 *           enum: [bitcoin, matic-network, ethereum]
 *         required: true
 *         description: The cryptocurrency to fetch stats for
 *     responses:
 *       200:
 *         description: Latest stats for the cryptocurrency
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 price:
 *                   type: number
 *                 marketCap:
 *                   type: number
 *                 24hChange:
 *                   type: number
 *       400:
 *         description: Validation error or bad input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
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

/**
 * @swagger
 * /deviation:
 *   get:
 *     summary: Get the standard deviation of the price of a cryptocurrency
 *     parameters:
 *       - in: query
 *         name: coin
 *         schema:
 *           type: string
 *           enum: [bitcoin, matic-network, ethereum]
 *         required: true
 *         description: The cryptocurrency to calculate price deviation for
 *     responses:
 *       200:
 *         description: Standard deviation of the cryptocurrency prices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deviation:
 *                   type: number
 *       400:
 *         description: Validation error or bad input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
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