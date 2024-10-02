import { boot } from 'quasar/wrappers';
import 'solana-wallets-vue/styles.css';
import SolanaWallets from 'solana-wallets-vue';
import { Buffer } from 'buffer';
import { WalletError } from '@solana/wallet-adapter-base';
import { WalletStoreProps } from 'solana-wallets-vue/dist/types';
import { Notify } from 'quasar';


window.Buffer = Buffer; // Make Buffer available globally


const walletOptions: WalletStoreProps = {
  onError: (error: WalletError) => {
    if (error.message.toLowerCase().includes('reject')) {
      Notify.create({
        message: 'User rejected the request',
        color: 'warning',
        position: 'top',
        timeout: 2000,
      });
      return;
    }

    if (error.name.toLowerCase().includes('sendtransaction')) {
      Notify.create({
        message: 'Transaction error.',
        color: 'red',
        position: 'top',
        timeout: 3000,
      });
      return;
    }
    // console.error(error);
    console.log('Wallet error ^^^^^^^^^ you can configure this error from /boot/solana-connection.ts');
  },
  cluster: 'devnet',
  autoConnect: false,
};


// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.use(SolanaWallets, walletOptions);
});
