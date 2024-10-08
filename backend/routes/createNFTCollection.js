import express from 'express';
import { _createCollection } from '../metaplex/create-metaplex-collection.js';
import { Collection } from '../models/collection.js';


const router = express.Router();

// /api/nftCollections/create
router.post('/create', async (req, res) => {
  const { pubKey, collectionName, collectionSymbol, collectionDesc } = req.body;


  try {
    if (!pubKey) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }
    await _createCollection(pubKey, collectionName, collectionSymbol, collectionDesc);

    return res.status(201).json({ message: 'Collection create request sent' });

  } catch (error) {
    console.error('Error creating collection:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// /api/nftCollections/collections
router.get('/collections', async (req, res) => {
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
