<script lang="ts" setup>
// Use /boot/solana-connection.ts file to handle errors

import { useWallet, WalletMultiButton } from 'solana-wallets-vue';

const { connected, publicKey } = useWallet();


</script>

<template>
  <div>
    <wallet-multi-button />
    <p v-if="connected">Wallet Connected: {{ publicKey }}</p>
  </div>
</template>

