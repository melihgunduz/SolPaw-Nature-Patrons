import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
  collectionName: { type: String, required: true },
  creatorAddress: { type: String, required: true },
  collectionAddress: { type: String, required: true },
  owner: { type: String, required: true },
});

export const Collection = mongoose.model('Collection', collectionSchema);

export const insertCollection = async (_tokenOwner, _collectionName, _creatorAddress, _collectionAddress) => {
  const collection = [
    {
      collectionName: _collectionName,
      creatorAddress: _creatorAddress,
      collectionAddress: _collectionAddress,
      owner: _tokenOwner,
    },
  ];

  try {
    await Collection.insertMany(collection);
    console.log('Collection inserted successfully.');
  } catch (error) {
    console.error('Error inserting collection:', error);
  }
};
