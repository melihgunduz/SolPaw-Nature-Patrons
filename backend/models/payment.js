import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  donationProjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'DonationProject', required: true },
  donorName: { type: String, required: true },
  amount: { type: Number, required: true },
  nftGranted: { type: Boolean, default: false },
});

export const Payment = mongoose.model('Payment', paymentSchema);

export const insertSamplePayments = async (donationProjectIds) => {
  const samplePayments = [
    {
      donationProjectId: donationProjectIds[0],
      donorName: "Alice Johnson",
      amount: 1.5,
      nftGranted: true,
    },
    {
      donationProjectId: donationProjectIds[1],
      donorName: "Bob Smith",
      amount: 2.5,
      nftGranted: false,
    },
    {
      donationProjectId: donationProjectIds[2],
      donorName: "Charlie Brown",
      amount: 1.5,
      nftGranted: true,
    },
  ];

  try {
    await Payment.insertMany(samplePayments);
    console.log("Sample payments inserted successfully.");
  } catch (error) {
    console.error("Error inserting sample payments:", error);
  }
};
