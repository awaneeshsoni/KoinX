import express from 'express';
import Crypto from '../models/Crypto.js';
import calculateStandardDeviation from '../services/calculateDeviation.js';

const router = express.Router();

// API: /stats
router.get('/stats', async (req, res) => {
    try {
        const { coin } = req.body;

        if (!coin) {
            return res.status(400).json({ error: 'coin parameter is required.' });
        }

        const crypto = await Crypto.findOne({ name: coin }).sort({ updatedAt: -1 });

        if (!crypto) {
            return res.status(404).json({ error: 'No data found for the requested cryptocurrency.' });
        }

        res.status(200).json({
            price: crypto.price,
            marketCap: crypto.marketCap,
            '24hChange': crypto.change24h,
        });
    } catch (error) {
        console.error('Error fetching stats:', error.message);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// API: /deviation
router.get('/deviation', async (req, res) => {
    try {
        const { coin } = req.body;

        if (!coin) {
            return res.status(400).json({ error: 'coin parameter is required.' });
        }

        const records = await Crypto.find({ name: coin }).sort({ updatedAt: -1 }).limit(100);

        if (records.length < 2) {
            return res.status(400).json({ error: 'Not enough data to calculate standard deviation.' });
        }

        const prices = records.map(record => record.price);
        const deviation = calculateStandardDeviation(prices);

        res.status(200).json({ deviation: parseFloat(deviation.toFixed(2)) });
    } catch (error) {
        console.error('Error calculating deviation:', error.message);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

export default router;
