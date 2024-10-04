<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { scroll, useQuasar } from 'quasar';
import InfoCarousel from 'components/InfoCarousel.vue';

const $q = useQuasar();

const cards = ref([
  {
    id: 1,
    title: 'Our Responsibility for Climate Change\n',
    description: 'Just like the sun rising from behind snow-capped mountain peaks, we have faith in a future full of hope. By joining hands together, we can combat climate change, fulfil our responsibility to nature and build a more livable world. This change is in the hands of all of us.',
    image: '../../public/assets/images/sunrise-over-mountain.jpg',
    color: 'blue',
    icon: 'fa-solid fa-temperature-half',
  },
  {
    id: 2,
    title: 'Protecting Greenery is Protecting the Future',
    description: 'Just like the sun rising behind the tree, we can also plant new hopes at every step. Nature offers us an abundance of beauties; it is a precious duty for all of us to give it the value it deserves. Let\'s step into a greener tomorrow hand in hand with nature.',
    image: '../../public/assets/images/sunrise-over-trees.jpg',
    color: 'green',
    icon: 'fa-solid fa-tree',

  },
  {
    id: 3,
    title: 'Protect Coral Reefs',
    description: 'By embracing animals with love, we can offer them a better future. The way to protect animals is to understand them, respond to their needs and share life together. We can all build a better life hand in hand with our friends on this planet.',
    image: '../../public/assets/images/love-animals.jpg',
    color: 'purple',
    icon: 'fa-solid fa-paw',
  },
]);

const showScrollToTop = ref(false);

const checkScroll = () => {
  showScrollToTop.value = window.pageYOffset > 300;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleScrollFire = (el: Element) => {
  if ($q.platform.is.desktop) {
    el.classList.add('animate-pop');
  }
};
const scrollTo = (sectionId: string) => {
  const el = document.getElementById(sectionId);
  if (el) {
    scroll.setVerticalScrollPosition(window, el.offsetTop, 500);
  }
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<template>
  <q-page padding>
    <section class="hero-banner q-mb-lg">
      <div>
        <div class="hero-content">
          <h1 :class="[$q.screen.lt.md ? 'text-h4' : 'text-h2', 'q-mb-md']">Help Protect Our Planet and
            Wildlife!</h1>
          <p :class="[$q.screen.lt.md ? 'text-body2' : 'text-h5', 'q-mb-lg']">Touch nature and animals with love, donate
            and contribute to a sustainable future.</p>
          <div :class="[$q.screen.lt.sm ? 'column' : 'row justify-around']">
            <q-btn :class="[$q.screen.lt.sm ? 'q-mb-md' : '']" :size="$q.screen.lt.md ? 'md' : 'lg'"
                   :to="{name:'Donate'}"
                   color="primary"
                   icon-right="fa-solid fa-coins"
                   label="Donate Now"
                   no-caps
                   rounded />
            <q-btn :size="$q.screen.lt.md ? 'md' : 'lg'" color="primary"
                   icon-right="fa-solid fa-magnifying-glass"
                   label="Explore more"
                   no-caps
                   rounded
                   @click="scrollTo('projects')" />
          </div>
        </div>
      </div>
    </section>
    <InfoCarousel />

    <!-- Item Cards Section -->
    <section id="projects" class="q-ma-md">
      <div class="container">
        <div id="our-initatives" class="text-h4 text-center q-mb-md">Our Initiatives</div>
        <div class="row q-col-gutter-md">
          <div v-for="card in cards" :key="card.id" class="col-12 col-md-4">
            <q-card v-scroll-fire="handleScrollFire" class="full-height column justify-between">
              <q-img :src="card.image" style="height: 340px" />
              <q-card-section class="text-center">
                <div class="text-h6">
                  <q-icon :color="card.color" :name="card.icon" size="sm" />
                  {{ card.title }}
                </div>
              </q-card-section>
              <q-card-section class="text-center">
                <p class="text-body2">{{ card.description }}</p>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn :color="card.color" :to="{name: 'Donate'}" flat label="Learn More" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- Scroll to Top Button -->
    <q-page-sticky :offset="[18, 18]" position="bottom-right">
      <q-btn
        v-show="showScrollToTop"
        color="primary"
        fab
        icon="keyboard_arrow_up"
        @click="scrollToTop"
      />
    </q-page-sticky>
  </q-page>
</template>

<style lang="scss" scoped>
.hero-banner {
  position: relative;
  height: calc(100vh - 85px - 48px); // Ekranın %60'ı kadar yükseklik
  overflow: hidden;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/assets/images/header-hero.jpg');
  background-size: cover;
  background-position: center;
  animation: breathe-out 10s;
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
  color: white;
}

@keyframes breathe-out {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.full-height {
  height: 100%;
}

.animate-pop {
  animation: pop 0.3s cubic-bezier(0.26, 0.54, 0.32, 1) forwards;
}

@keyframes pop {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
