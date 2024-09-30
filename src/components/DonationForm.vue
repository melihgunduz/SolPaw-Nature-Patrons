<template>
  <q-card class="my-card" style="width: 300px">
    <q-card-section>
      <div class="text-h6">Make a Donation</div>
    </q-card-section>

    <q-card-section>
      <q-input v-model="amount" type="number" label="Donation Amount" />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="red" />
      <q-btn flat label="Donate" color="primary" @click="makeDonation" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'

const amount = ref(0)

const makeDonation = () => {
  // Web3 donation process will be implemented here
  console.log(`${amount.value} tokens donated`)
}
</script>
