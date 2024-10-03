import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { insertSampleProjects } from '../models/donationProject.js';
import { insertSamplePayments } from '../models/payment.js';

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const collectionName = 'donationprojects';
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionExists = collections.some(col => col.name === collectionName);

    if (!collectionExists) {
      console.log(`Collection '${collectionName}' not found. Datas creating...`);
      const donationProjectIds = await insertSampleProjects();
      await insertSamplePayments(donationProjectIds);
    } else {
      console.log(`Collection '${collectionName}' already created.`);
    }

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
