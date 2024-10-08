import {
  createNft,
  findMetadataPda,
  mplTokenMetadata,
  verifyCollectionV1,
} from '@metaplex-foundation/mpl-token-metadata';
import { createGenericFile, generateSigner, keypairIdentity, percentAmount } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';
import { getKeypairFromFile } from '@solana-developers/helpers';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { promises as fs } from 'fs';
import * as path from 'path';
import { insertCollection } from '../models/collection.js';


// create a new connection to Solana's devnet cluster
const connection = new Connection(clusterApiUrl('devnet'));

// load keypair from local file system
// See https://github.com/solana-developers/helpers?tab=readme-ov-file#get-a-keypair-from-a-keypair-file

//https://docs.solanalabs.com/cli/wallets/file-system follow this steps to create local wallet
const user = await getKeypairFromFile('~/my-solana-wallet/my-keypair.json');


const umi = createUmi(connection);


// convert to umi compatible keypair
const umiKeypair = umi.eddsa.createKeypairFromSecretKey(user.secretKey);

// assigns a signer to our umi instance, and loads the MPL metadata program and Irys uploader plugins.
umi
  .use(keypairIdentity(umiKeypair))
  .use(mplTokenMetadata())
  .use(irysUploader());


export async function _createCollection(_tokenOwner, _collectionName, _symbol, _description) {
  const collectionImagePath = path.resolve(`${import.meta.dirname}/images`, 'collection.png');

  const buffer = await fs.readFile(collectionImagePath);
  const file = createGenericFile(buffer, collectionImagePath, {
    contentType: 'image/png',
  });
  const [image] = await umi.uploader.upload([file]);
  // console.log('image uri:', image);

// upload offchain json to Arweave using irys
  console.log('json uploading');
  const uri = await umi.uploader.uploadJson({
    name: _collectionName,
    symbol: _symbol,
    description: _description,
    image,
  });
  // console.log('Collection offchain metadata URI:', uri);


// generate mint keypair
  // equals to collection address
  const collectionMint = generateSigner(umi);
  console.log('tx sent');


// create and mint NFT
  await createNft(umi, {
    mint: collectionMint, // collection address
    name: _collectionName,
    description: _description,
    symbol: _symbol,
    uri,
    tokenOwner: _tokenOwner,
    updateAuthority: umi.identity.publicKey,
    sellerFeeBasisPoints: percentAmount(0),
    isCollection: true,
  }).sendAndConfirm(umi, { send: { commitment: 'finalized' } })
    .then(async () => {
      await insertCollection(_tokenOwner, _collectionName, umiKeypair.publicKey, collectionMint.publicKey);
      console.log('verifying collection');
      const metadata = findMetadataPda(umi, { mint: collectionMint.publicKey });

      await verifyCollectionV1(umi, {
        metadata,
        collectionMint,
        authority: umi.identity,
      }).sendAndConfirm(umi);

      console.log('collection verified');


    }).catch((err) => {
      console.error('Error creating collection on-chain: ', err);
    });


  // const explorerLink = getExplorerLink(
  //   'address',
  //   collectionMint.publicKey,
  //   'devnet',
  // );


  // fs.writeFile('collectionAddress.json', JSON.stringify(collectionMint.publicKey)).then(() => {
  //   console.log(`Collection NFT:  ${explorerLink}`);
  //   console.log('Collection NFT address is:', collectionMint.publicKey);
  //   console.log('✅ Finished successfully!');
  // });

}



