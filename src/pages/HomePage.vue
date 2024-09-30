<script lang="ts" setup>

import InfoCarousel from 'components/InfoCarousel.vue';

const cards = [
  {
    id: 1,
    title: 'Adopt a Rainforest',
    description: 'Help us protect rainforests, vital to climate regulation and home to countless species.',
    image: 'https://cdn.pixabay.com/photo/2019/09/25/09/40/rainforest-4509824_1280.jpg',
  },
  {
    id: 2,
    title: 'Save the Whales',
    description: 'Contribute to efforts to save endangered whale species from poaching and climate threats.',
    image: 'https://cdn.pixabay.com/photo/2020/06/30/13/50/whale-5357664_1280.jpg',
  },
  {
    id: 3,
    title: 'Protect Coral Reefs',
    description: 'Support coral reef restoration projects to save underwater ecosystems.',
    image: 'https://cdn.pixabay.com/photo/2021/05/05/14/37/coral-reef-6230693_1280.jpg',
  },
];

</script>

<template>
  <q-page class="bg-light">
    <!-- Hero Banner -->
    <q-banner class="text-white text-h5 q-pa-md bg-accent">
      <div class="row items-center q-col-gutter-md">
        <div class="col-auto">
          <q-icon name="pets" size="80px" />
        </div>
        <div class="col">
          <div>
            <strong>Help Protect Our Planet and Wildlife!</strong>
          </div>
          <div class="text-subtitle2">Your donation makes a difference. Support our cause today.</div>
        </div>
        <div class="col-auto">
          <q-btn class="q-px-lg" color="secondary" label="Donate Now" />
        </div>
      </div>
    </q-banner>

    <InfoCarousel />

    <!-- Donation Section -->
    <div class="q-pa-lg">
      <q-card class="q-pa-lg">
        <div class="row justify-center">
          <div class="col-12 col-md-8 text-center">
            <q-img
              class="rounded-borders"
              contain
              src="https://cdn.pixabay.com/photo/2019/04/20/11/35/earth-4149673_1280.jpg"
              style="height: 250px"
            />
            <h2 class="q-mt-md text-primary">Make a Donation</h2>
            <q-btn class="q-mt-sm" color="primary" label="Donate Now" size="lg" />
            <p class="q-mt-md q-mb-none">Every donation counts towards a better future for our environment and its
              wildlife.</p>
          </div>
        </div>
      </q-card>
    </div>

    <!-- Item Cards Section -->
    <div class="q-pa-md row q-col-gutter-md q-mt-lg">
      <div v-for="card in cards" :key="card.id" class="col-12 col-md-4">
        <q-card>
          <q-img :src="card.image" class="rounded-borders" />
          <q-card-section>
            <div class="text-h6">{{ card.title }}</div>
            <div class="text-subtitle2">{{ card.description }}</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn color="primary" flat label="Learn More" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.bg-light {
  background-color: #f5f5f5;
}

.rounded-borders {
  border-radius: 12px;
}
</style>
