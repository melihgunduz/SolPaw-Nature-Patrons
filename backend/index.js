const express = require('express');
const { Connection, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const { Metaplex, keypairIdentity } = require('@metaplex-foundation/js');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const connection = new Connection('https://api.devnet.solana.com');
const metaplex = Metaplex.make(connection).use(keypairIdentity(/*Keypair'iniz buraya*/));

const nftMetadata = {
  name: "Donation NFT",
  symbol: "DONATE",
  uri: "https://example.com/nft-metadata",
  sellerFeeBasisPoints: 500,
};

app.post('/donate', async (req, res) => {
  const { donorPublicKey, amount } = req.body;

  try {
    const donor = new PublicKey(donorPublicKey);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: donor,
        toPubkey: new PublicKey(process.env.TO_PUBLIC_KEY),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    const signature = await connection.sendTransaction(transaction, [/* Cüzdan Keypair */]);
    await connection.confirmTransaction(signature);

    const nft = await metaplex
      .nfts()
      .create({
        ...nftMetadata,
        collection: new PublicKey("YOUR_COLLECTION_ADDRESS"),
        owner: donor,
      });

    res.status(200).json({ message: 'Donation successful', nftAddress: nft.mintAddress.toString() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Donation failed' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
