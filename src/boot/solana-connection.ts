import { boot } from 'quasar/wrappers';
import 'solana-wallets-vue/styles.css';
import SolanaWallets from 'solana-wallets-vue';
import { Buffer } from 'buffer';
import { WalletError } from '@solana/wallet-adapter-base';

window.Buffer = Buffer; // Make Buffer available globally

const walletOptions = {
  onError: (error: WalletError) => {
    console.error(error);
    console.log('Wallet error ^^^^^^^^^ you can configure this error from /boot/solana-connection.ts');
  },
};


// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.use(SolanaWallets, walletOptions);
});
