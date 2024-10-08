import express from 'express';
import { Payment } from '../models/payment.js';
import { DonationProject } from '../models/donationProject.js';

const router = express.Router();

async function createPayment(donationProjectId, donorName, amount) {
  const payment = new Payment({ donationProjectId, donorName, amount });
  await payment.save();
  console.log('Payment record added successfully:', payment);
}

async function addPayment(donationProjectId, donorName, amount) {
  await createPayment(donationProjectId, donorName, amount);
  await DonationProject.findByIdAndUpdate(donationProjectId, { $inc: { totalCollected: amount } });
}

// /api/payments/donate
router.post('/donate', async (req, res) => {
  const { donationProjectId, donorName, amount } = req.body;

  console.log(req.body);
  try {
    if (!donationProjectId || !donorName || !amount) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    await addPayment(donationProjectId, donorName, amount);

    return res.status(201).json({ message: 'Payment added successfully' });
  } catch (error) {
    console.error('Error adding payment:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
