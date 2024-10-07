import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
  collectionName: { type: String, required: true },
  creatorName: { type: String, required: true },
  txHash: { type: String, required: true },
  owner: { type: String, required: true },
});

export const Collection = mongoose.model('Collection', collectionSchema);

export const insertCollection = async (_tokenOwner, _name, _creatorName, _txHash) => {
  const collection = [
    {
      collectionName: _tokenOwner,
      creatorName: _name,
      txHash: _creatorName,
      owner: _txHash,
    },
  ];

  try {
    await Collection.insertMany(collection);
    console.log('Collection inserted successfully.');
  } catch (error) {
    console.error('Error inserting collection:', error);
  }
};
