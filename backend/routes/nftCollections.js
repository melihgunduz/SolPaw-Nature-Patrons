import express from 'express';
import { Collection } from '../models/collection.js'; // Import your Collection model

const router = express.Router();

// GET /api/donations/recent
router.get('/nftCollections', async (req, res) => {
  try {
    const collections = await Collection.find()
      .sort({ createdAt: -1 }) // Sort by date in descending order
      .limit(10); // Limit to the most recent 10 collections
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donations', error });
  }
});

export default router;
