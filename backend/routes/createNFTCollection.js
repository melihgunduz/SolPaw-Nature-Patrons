import express from 'express';
import { _createCollection } from '../metaplex/create-metaplex-collection.js';
// import { Collection } from '../models/collection.js';


const router = express.Router();


router.post('/createCollection', async (req, res) => {
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

export default router;
