import { createNft, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import {
  createGenericFile,
  generateSigner,
  keypairIdentity,
  percentAmount,
  publicKey as UMIPublicKey,
} from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';
import { getExplorerLink, getKeypairFromFile } from '@solana-developers/helpers';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { promises as fs } from 'fs';
import * as path from 'path';

// create a new connection to Solana's devnet cluster
const connection = new Connection(clusterApiUrl('devnet'));

// load keypair from local file system
// assumes that the keypair is already generated using `solana-keygen new`

//https://docs.solanalabs.com/cli/wallets/file-system follow this steps to create local wallet
const user = await getKeypairFromFile('~/my-solana-wallet/my-keypair.json'); // location of your wallet keypair

const umi = createUmi(connection);

// convert to umi compatible keypair
const umiKeypair = umi.eddsa.createKeypairFromSecretKey(user.secretKey);

// load our plugins and signer
umi
  .use(keypairIdentity(umiKeypair))
  .use(mplTokenMetadata())
  .use(irysUploader());

const NFTImagePath = path.resolve(`${import.meta.dirname}/images`, 'nft.png');

const buffer = await fs.readFile(NFTImagePath);
const file = createGenericFile(buffer, NFTImagePath, {
  contentType: 'image/png',
});

// upload image and get image uri
const [image] = await umi.uploader.upload([file]);
// console.log('image uri:', image);

// upload offchain json using irys and get metadata uri
export async function _createNFT(_collectionNftAddress, _tokenName, _tokenSymbol, _tokenDesc, _customerPubKey) {
  const uri = await umi.uploader.uploadJson({
    name: _tokenName,
    symbol: _tokenSymbol,
    description: _tokenDesc,
    image,
  });

// generate mint keypair
  const mint = generateSigner(umi);

// create and mint NFT
  await createNft(umi, {
    mint,
    name: _tokenName,
    symbol: _tokenSymbol,
    uri,
    tokenOwner: _customerPubKey,
    updateAuthority: umi.identity.publicKey,
    sellerFeeBasisPoints: percentAmount(0),
    collection: {
      key: UMIPublicKey(_collectionNftAddress),
      verified: false,
    },
  }).sendAndConfirm(umi, { send: { commitment: 'finalized' } });

  const explorerLink = getExplorerLink('address', mint.publicKey, 'devnet');
  console.log(`Token Mint:  ${explorerLink}`);
}
