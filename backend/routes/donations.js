import express from 'express';
import { Payment } from '../models/payment.js'; // Import your Payment model

const router = express.Router();

// GET /api/donations/recent
router.get('/recent', async (req, res) => {
  try {
    const donations = await Payment.find()
      .sort({ createdAt: -1 }) // Sort by date in descending order
      .limit(10); // Limit to the most recent 10 donations
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donations', error });
  }
});

export default router;
