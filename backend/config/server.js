import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import donationsRouter from '../routes/donations.js';
import paymentsRouter from '../routes/payments.js';
import nftCollectionRouter from '../routes/createNFTCollection.js';
import nftTokenRouter from '../routes/createNftTokenInCollection.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/donations', donationsRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/nftCollections', nftCollectionRouter);
app.use('/api/tokens', nftTokenRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
