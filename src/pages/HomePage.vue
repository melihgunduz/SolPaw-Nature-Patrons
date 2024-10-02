<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import InfoCarousel from 'components/InfoCarousel.vue';

const $q = useQuasar();

const cards = ref([
  {
    id: 1,
    title: 'Adopt a Rainforest',
    description: 'Help us protect rainforests, vital to climate regulation and home to countless species.',
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/01/tree-736888_1280.jpg',
    icon: 'fa-solid fa-tree',
  },
  {
    id: 2,
    title: 'Save the Whales',
    description: 'Contribute to efforts to save endangered whale species from poaching and climate threats.',
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/01/tree-736888_1280.jpg',
    icon: 'fa-solid fa-water',
  },
  {
    id: 3,
    title: 'Protect Coral Reefs',
    description: 'Support coral reef restoration projects to save underwater ecosystems.',
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/01/tree-736888_1280.jpg',
    icon: 'fa-solid fa-fish',
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

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<template>
  <q-page>
    <section class="hero-banner q-ma-md rounded-borders">
      <div class="hero-image">
        <div class="hero-content">
          <h1 class="text-h2 text-white q-mb-md">Help Protect Our Planet and Wildlife!</h1>
          <p class="text-h5 text-white q-mb-lg">Your donation makes a difference. Support our cause today.</p>
          <q-btn :size="$q.screen.lt.md ? 'md' : 'lg'" :to="{name:'Donate'}" color="primary"
                 icon-right="fa-solid fa-coins"
                 label="Donate Now"
                 no-caps />
        </div>
      </div>
    </section>
    <div class="text-h4 text-center">Our Initiatives</div>

    <InfoCarousel class="q-ma-md" />

    <!-- Item Cards Section -->
    <section class="q-ma-md ">
      <div class="container">
        <div id="our-initatives" class="text-h4 text-center q-mb-md">Our Initiatives</div>
        <div class="row q-col-gutter-lg">
          <div v-for="card in cards" :key="card.id" class="col-12 col-md-4">
            <q-card v-scroll-fire="handleScrollFire" class="full-height">
              <q-img :src="card.image" style="height: 200px">
                <div class="absolute-bottom text-subtitle2 text-center" style="background-color: rgba(0, 0, 0, 0.3);">
                  {{ card.title }}
                </div>
              </q-img>
              <q-card-section>
                <div class="text-h6 q-mb-xs">
                  <q-icon :name="card.icon" size="md" />
                  {{ card.title }}
                </div>
                <p class="text-body2">{{ card.description }}</p>
              </q-card-section>
              <q-card-actions align="right" class="q-pa-md">
                <q-btn color="primary" flat label="Learn More" to="/donate" />
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
  height: 60vh; // Ekranın %60'ı kadar yükseklik
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
