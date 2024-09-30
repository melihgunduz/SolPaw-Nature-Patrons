<template>
  <div class="q-pa-md">
    <q-carousel
      v-model="slide"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      control-color="primary"
      navigation
      padding
      arrows
      height="400px"
      class="bg-grey-1 shadow-2 rounded-borders"
    >
      <q-carousel-slide v-for="(slide, index) in slides" :key="index" :name="index" class="column no-wrap">
        <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
          <q-img
            class="rounded-borders col-6 full-height"
            :src="slide.img"
          />
          <div class="col-6 text-center q-pa-md">
            <h4 class="q-mt-md text-weight-bold">{{ slide.title }}</h4>
            <p class="q-mt-md">{{ slide.desc }}</p>
            <q-btn color="primary" :label="slide.button" class="q-mt-md" />
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const slide = ref(0);
const slides = [
  {
    title: 'Protect Endangered Species',
    desc: 'Your donation helps safeguard vulnerable species from extinction.',
    img: 'https://cdn.pixabay.com/photo/2015/04/23/22/01/tree-736888_1280.jpg',
    button: 'Donate Now'
  },
  {
    title: 'Restore Habitats',
    desc: 'Help us rebuild and protect critical habitats for wildlife.',
    img: 'https://cdn.pixabay.com/photo/2015/04/23/22/01/tree-736888_1280.jpg',
    button: 'Learn More'
  },
  {
    title: 'Combat Climate Change',
    desc: 'Support initiatives to reduce carbon emissions and fight global warming.',
    img: 'https://cdn.pixabay.com/photo/2015/04/23/22/01/tree-736888_1280.jpg',
    button: 'Get Involved'
  }
];
</script>

<style lang="scss" scoped>
.q-carousel {
  background: linear-gradient(145deg, #f3f3f3, #ffffff);
}

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
