import express from 'express';

import { _createNFT } from '../metaplex/create-metaplex-nft.js';


const router = express.Router();

// /api/tokens/create
router.post('/create', async (req, res) => {
  const { collectionNftAddress, tokenName, tokenSymbol, tokenDesc, customerPubKey } = req.body;


  try {
    if (!customerPubKey) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }
    await _createNFT(collectionNftAddress, tokenName, tokenSymbol, tokenDesc, customerPubKey);

    return res.status(201).json({ message: 'Token create request sent' });

  } catch (error) {
    console.error('Error creating collection:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
