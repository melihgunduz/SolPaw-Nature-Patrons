import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { insertSampleProjects } from '../models/donationProject.js';
import { insertSamplePayments } from '../models/payment.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    const donationProjectIds = await insertSampleProjects();
    await insertSamplePayments(donationProjectIds);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
