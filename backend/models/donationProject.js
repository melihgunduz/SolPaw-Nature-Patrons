// models/DonationProject.js
import mongoose from 'mongoose';

const donationProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  totalCollected: { type: Number, default: 0 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export const DonationProject = mongoose.model('DonationProject', donationProjectSchema);

const sampleProjects = [
  {
    title: "Clean Water Initiative",
    description: "Providing clean drinking water to communities in need.",
    targetAmount: 5000,
    totalCollected: 1415,
    startDate: new Date("2024-01-11"),
    endDate: new Date("2027-12-31"),
  },
  {
    title: "Tree Planting Campaign",
    description: "Planting trees to combat climate change and promote biodiversity.",
    targetAmount: 3000,
    totalCollected: 1256,
    startDate: new Date("2024-02-21"),
    endDate: new Date("2026-11-30"),
  },
  {
    title: "Education for All",
    description: "Supporting education for underprivileged children through scholarships.",
    targetAmount: 10000,
    totalCollected: 6575,
    startDate: new Date("2024-03-12"),
    endDate: new Date("2026-12-31"),
  },
];

export const insertSampleProjects = async () => {
  try {
    const insertedProjects = await DonationProject.insertMany(sampleProjects);
    console.log("Sample donation projects inserted successfully.");
    return insertedProjects.map(project => project._id);
  } catch (error) {
    console.error("Error inserting sample projects:", error);
    return [];
  }
};
