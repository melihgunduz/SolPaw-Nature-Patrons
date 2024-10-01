<script lang="ts" setup>
// Use /boot/solana-connection.ts file to handle errors

import { useWallet, WalletMultiButton } from 'solana-wallets-vue';
import { watch } from 'vue';
import { useQuasar } from 'quasar';

const { connected, ready, cluster } = useWallet();
const $q = useQuasar();


watch(connected, () => {
  console.log(cluster.value);
  if (!ready.value) {
    $q.notify({
      message: 'There is no connected account.',
      color: 'warning',
      position: 'top',
      timeout: 2000,
    });
  }
});
//walletconnectionerror
</script>

<template>
  <div>
    <wallet-multi-button />
  </div>
</template>

