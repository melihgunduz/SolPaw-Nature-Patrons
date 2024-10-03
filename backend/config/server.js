import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import donationsRouter from '../routes/donations.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/donations', donationsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
