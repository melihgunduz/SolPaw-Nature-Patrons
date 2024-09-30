<template>
  <q-card class="my-card" style="width: 300px">
    <q-card-section>
      <div class="text-h6">Recent Donations</div>
    </q-card-section>

    <q-list>
      <q-item v-for="donation in donations" :key="donation.id">
        <q-item-section>
          <q-item-label>{{ donation.address }}</q-item-label>
          <q-item-label caption>{{ donation.amount }} Tokens</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'

const donations = ref([
  { id: 1, address: '0x1234...5678', amount: 10 },
  { id: 2, address: '0x8765...4321', amount: 5 },
  // More donations can be added
])
</script>
