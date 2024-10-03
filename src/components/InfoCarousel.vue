<script lang="ts" setup>
import { ref } from 'vue';

const slide = ref(0);
const slides = [
  {
    title: 'Protect Endangered Species',
    desc: 'In order to sprout a future in harmony with nature, we direct benevolent individuals to environmentally friendly projects with crypto donations. By planting our seeds together, we are creating a world where new leaves bloom with every donation.',
    img: '../../public/assets/images/planting.jpg',
    button: 'Donate Now',
  },
  {
    title: 'Restore Habitats',
    desc: 'The contribution of each benefactor contributes to the sprouting of a green future and the strengthening of environmental ecosystems.',
    img: '../../public/assets/images/river.jpg',
    button: 'Learn More',
  },
  {
    title: 'Combat Climate Change',
    desc: 'Support initiatives to reduce carbon emissions and fight global warming.',
    img: '../../public/assets/images/misty-lake.jpg',
    button: 'Get Involved',
  },
];
</script>

<template>
  <div class="row justify-center">
    <q-carousel
      v-model="slide"
      :class="[$q.screen.lt.md ? 'col-12' : $q.screen.lt.lg ? 'col-9' : 'col-8', 'shadow-4 rounded-borders']"
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
        <div
          :class="[$q.screen.gt.sm ? 'absolute-bottom q-ml-xl q-mb-xl q-mr-lg' : 'absolute-bottom-left q-ma-sm']">
          <div class="text-h2 q-mb-lg">{{ slide.title }}</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>


<style lang="scss" scoped>
.q-img {
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
