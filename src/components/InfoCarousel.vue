<template>
  <q-carousel
    v-model="slide"
    :dark="$q.dark.isActive"
    animated
    arrows
    class="shadow-4 rounded-borders q-pa-md q-ma-md"
    control-color="primary"
    padding
    swipeable
    transition-next="scale"
    transition-prev="scale"
  >
    <q-carousel-slide v-for="(slide, index) in slides" :key="index" :name="index" class="column no-wrap">
      <div :class="[$q.screen.gt.xs ? 'row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap': '']">
        <q-img
          :class="[$q.screen.gt.xs ? 'full-height': '', 'rounded-borders col-6']"
          :src="slide.img"
        />
        <div class="col-12 col-sm-6 text-center q-pa-md">
          <div v-if="$q.screen.gt.xs" class="q-mt-md text-h4 text-weight-bold">{{ slide.title }}</div>
          <div v-else class="text-bold">{{ slide.title }}</div>
          <p class="q-mt-md">{{ slide.desc }}</p>
          <q-btn :label="slide.button" color="primary" />
        </div>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const slide = ref(0);
const slides = [
  {
    title: 'Protect Endangered Species',
    desc: 'Your donation helps safeguard vulnerable species from extinction.',
    img: 'https://cdn.pixabay.com/photo/2015/04/23/22/01/tree-736888_1280.jpg',
    button: 'Donate Now',
  },
  {
    title: 'Restore Habitats',
    desc: 'Help us rebuild and protect critical habitats for wildlife.',
    img: 'https://cdn.pixabay.com/photo/2015/04/23/22/01/tree-736888_1280.jpg',
    button: 'Learn More',
  },
  {
    title: 'Combat Climate Change',
    desc: 'Support initiatives to reduce carbon emissions and fight global warming.',
    img: 'https://cdn.pixabay.com/photo/2015/04/23/22/01/tree-736888_1280.jpg',
    button: 'Get Involved',
  },
];
</script>

<style lang="scss" scoped>


.q-carousel__slide {
  padding: 0;
}

.q-img {
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
