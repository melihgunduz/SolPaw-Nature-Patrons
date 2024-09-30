<script lang="ts" setup>
import { ref } from 'vue';
import { QCarousel } from 'quasar';


const slide = ref(1);
const carousel = ref<InstanceType<typeof QCarousel> | null>(null);


const slides = ref([
  {
    name: 1,
    icon: 'style',
    description: 'From funding clean energy projects to preserving wildlife habitats, your cryptocurrency donation supports innovative solutions to environmental challenges. By choosing crypto, you join a movement that embraces cutting-edge technology to tackle climate change and promote sustainability.',
  },
  {
    name: 2,
    icon: 'live_tv',
    description: 'Cryptocurrency knows no borders. By donating in crypto, you can instantly fund critical environmental projects worldwide, from planting trees in the Amazon to saving endangered species in Africa. No banks, no delays—just immediate action for our planet',
  },
  {
    name: 3,
    icon: 'layers',
    description: 'Make a lasting impact on the environment by donating in cryptocurrency. Fast, secure, and borderless, your contribution can help protect our planet from anywhere in the world. Support reforestation, ocean cleanup, wildlife protection, and other green initiatives while leveraging the power of blockchain technology.',
  },
  {
    name: 4,
    icon: 'terrain',
    description: 'fourth slide',
  },
]);


const goToPreviousSlide = () => {
  carousel.value?.previous();
};

const goToNextSlide = () => {
  carousel.value?.next();
};

</script>

<template>
  <q-carousel ref="carousel" v-model="slide" animated
              class="q-ma-lg rounded-borders bg-amber-3"
              swipeable
              transition-next="jump-left" transition-prev="jump-right"
  >

    <q-carousel-slide v-for="(item,key) in slides" :key="key" :name="item.name"
                      class="column no-wrap flex-center q-px-xl">
      <q-icon :name="item.icon" color="primary" size="xl" />
      <div class="q-mt-md text-center">
        {{ item.description }}
      </div>
    </q-carousel-slide>

    <template v-slot:control>
      <q-carousel-control
        class="q-gutter-xs no-margin click-area"
        position="left"
        @click="goToPreviousSlide"
      >
        <q-icon class="text-black" name="arrow_left" size="md" />

      </q-carousel-control>

      <q-carousel-control
        class="q-gutter-xs no-margin click-area"
        position="right"
        @click="goToNextSlide"

      >
        <q-icon class="text-black" name="arrow_right" size="md" />

      </q-carousel-control>
    </template>

  </q-carousel>
</template>

<style scoped>
.click-area {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center;
}

.click-area:hover {
  backdrop-filter: brightness(80%);
  cursor: pointer;
}
</style>
