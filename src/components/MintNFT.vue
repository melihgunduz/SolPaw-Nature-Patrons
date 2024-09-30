<template>
  <q-card class="my-card" style="width: 300px">
    <q-card-section>
      <div class="text-h6">NFT Minting</div>
    </q-card-section>

    <q-card-section>
      <p>You can mint your NFT after making a donation.</p>
    </q-card-section>

    <q-card-actions align="center">
      <q-btn color="secondary" label="Mint NFT" @click="mintNFT" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
const mintNFT = () => {
  // NFT minting process will be implemented here
  console.log('NFT minting process initiated')
}
</script>
