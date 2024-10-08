// import { createNft, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
// import { createGenericFile, generateSigner, keypairIdentity, percentAmount } from '@metaplex-foundation/umi';
// import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
// import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';
// import { getKeypairFromFile } from '@solana-developers/helpers';
// import { clusterApiUrl, Connection } from '@solana/web3.js';
// import { promises as fs } from 'fs';
// import * as path from 'path';
// import { insertCollection } from 'app/backend/models/collection';
//
//
// // create a new connection to Solana's devnet cluster
// const connection = new Connection(clusterApiUrl('devnet'));
//
// // load keypair from local file system
// // See https://github.com/solana-developers/helpers?tab=readme-ov-file#get-a-keypair-from-a-keypair-file
//
// //https://docs.solanalabs.com/cli/wallets/file-system follow this steps to create local wallet
// const user = await getKeypairFromFile('~/my-solana-wallet/my-keypair.json');
//
//
// const umi = createUmi(connection);
//
//
// // convert to umi compatible keypair
// const umiKeypair = umi.eddsa.createKeypairFromSecretKey(user.secretKey);
//
// // assigns a signer to our umi instance, and loads the MPL metadata program and Irys uploader plugins.
// umi
//   .use(keypairIdentity(umiKeypair))
//   .use(mplTokenMetadata())
//   .use(irysUploader());
//
//
// export function _createCollection(_tokenOwner: string, _name: string, _symbol: string, _description: string) {
//   const collectionImagePath = path.resolve(`${__dirname}/images`, 'collection.png');
//
//   const buffer = await fs.readFile(collectionImagePath);
//   const file = createGenericFile(buffer, collectionImagePath, {
//     contentType: 'image/png',
//   });
//   const [image] = await umi.uploader.upload([file]);
//   // console.log('image uri:', image);
//
// // upload offchain json to Arweave using irys
//   const uri = await umi.uploader.uploadJson({
//     name: _name,
//     symbol: _symbol,
//     description: _description,
//     image,
//   });
//   // console.log('Collection offchain metadata URI:', uri);
//
//
// // generate mint keypair
//   const collectionMint = generateSigner(umi);
//
// // create and mint NFT
//   await createNft(umi, {
//     mint: collectionMint,
//     name: _name,
//     uri,
//     updateAuthority: umi.identity.publicKey,
//     sellerFeeBasisPoints: percentAmount(0),
//     isCollection: true,
//     tokenOwner: _tokenOwner,
//     payer: _tokenOwner,
//   }).sendAndConfirm(umi, { send: { commitment: 'finalized' } })
//     .then(() => {
//       await insertCollection(_tokenOwner, _name, _tokenOwner, collectionMint.publicKey);
//     }).catch((err) => {
//       console.error('Error creating collection on-chain: ', err);
//     });
//
//   // const explorerLink = getExplorerLink(
//   //   'address',
//   //   collectionMint.publicKey,
//   //   'devnet',
//   // );
//
//
//   // fs.writeFile('collectionAddress.json', JSON.stringify(collectionMint.publicKey)).then(() => {
//   //   console.log(`Collection NFT:  ${explorerLink}`);
//   //   console.log('Collection NFT address is:', collectionMint.publicKey);
//   //   console.log('✅ Finished successfully!');
//   // });
//
// }
//
//
//
