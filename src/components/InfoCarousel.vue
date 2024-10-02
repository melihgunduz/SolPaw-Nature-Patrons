<template>
  <div class="row justify-center">
    <q-carousel
      v-model="slide"
      :class="[$q.screen.lt.md ? 'col-12' : $q.screen.lt.lg ? 'col-9 ' : 'col-8', 'shadow-4 rounded-borders']"
      :dark="$q.dark.isActive"
      animated
      arrows
      control-color="accent"
      control-type="regular"
      height="500px"
      padding
      swipeable
      transition-next="scale"
      transition-prev="scale"
    >
      <q-carousel-slide v-for="(slide,index) in slides" :key="index" :img-src="slide.img" :name="index"
                        class="text-white">
        <div :class="$q.screen.gt.sm ?'absolute-bottom q-ml-xl q-mb-xl' : 'absolute-bottom-left q-ma-sm'">
          <div class="text-h2 q-mb-lg">{{ slide.title }}</div>
          <div class="text-subtitle1">{{ slide.desc }}</div>
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
.q-img {
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
