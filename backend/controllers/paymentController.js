import { Payment } from '../models/payment.js';
import { DonationProject } from '../models/donationProject.js';

export async function createPayment(donationProjectId, donorName, amount, nftGranted) {
  const payment = new Payment({ donationProjectId, donorName, amount, nftGranted });
  await payment.save();
  console.log('Payment record added successfully:', payment);
}

export async function addPayment(donationProjectId, donorName, amount, nftGranted) {
  await createPayment(donationProjectId, donorName, amount, nftGranted);
  await DonationProject.findByIdAndUpdate(donationProjectId, { $inc: { totalCollected: amount } });
}
