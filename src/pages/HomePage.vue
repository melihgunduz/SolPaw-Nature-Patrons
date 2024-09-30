<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useQuasar } from 'quasar';
import InfoCarousel from 'components/InfoCarousel.vue';

const $q = useQuasar();

const cards = ref([
  {
    id: 1,
    title: 'Adopt a Rainforest',
    description: 'Help us protect rainforests, vital to climate regulation and home to countless species.',
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/01/tree-736888_1280.jpg',
    icon: 'fa-solid fa-tree'
  },
  {
    id: 2,
    title: 'Save the Whales',
    description: 'Contribute to efforts to save endangered whale species from poaching and climate threats.',
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/01/tree-736888_1280.jpg',
    icon: 'fa-solid fa-water'
  },
  {
    id: 3,
    title: 'Protect Coral Reefs',
    description: 'Support coral reef restoration projects to save underwater ecosystems.',
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/01/tree-736888_1280.jpg',
    icon: 'fa-solid fa-fish'
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
  <q-page class="bg-grey-1">
    <!-- Hero Banner -->
    <section class="hero-banner q-pa-md bg-primary text-white">
      <div class="container">
        <div class="row items-center q-col-gutter-lg">
          <div class="col-12 col-md-8">
            <h1 class="text-h3 q-mb-md">Help Protect Our Planet and Wildlife!</h1>
            <p class="text-h6 q-mb-lg">Your donation makes a difference. Support our cause today.</p>
            <q-btn size="lg" color="secondary" label="Donate Now" to="/donate" class="q-px-xl">
              <font-awesome-icon icon="fa-solid fa-hand-holding-heart" class="q-mr-sm" />
            </q-btn>
          </div>
          <div class="col-12 col-md-4 text-center">
            <q-img src="https://cdn.pixabay.com/photo/2017/01/31/17/10/earth-2025795_1280.png"
                   style="width: 250px; height: 250px"
                   class="rotate-animation" />
          </div>
        </div>
      </div>
    </section>

    <InfoCarousel class="q-my-xl" />

    <!-- Donation Section -->
    <section class="donation-section q-pa-xl bg-white">
      <div class="container">
        <div class="row justify-center">
          <div class="col-12 col-md-8 text-center">
            <q-img
              class="rounded-borders q-mb-lg"
              src="https://cdn.pixabay.com/photo/2015/04/23/22/01/tree-736888_1280.jpg"
              style="height: 300px; max-width: 500px"
            >
              <div class="absolute-full text-subtitle1 flex flex-center" style="background-color: rgba(0, 0, 0, 0.3);">
                Every donation counts!
              </div>
            </q-img>
            <h2 class="text-h4 text-primary q-mb-md">Make a Donation</h2>
            <p class="q-mb-lg text-body1">Every donation counts towards a better future for our environment and its wildlife.</p>
            <q-btn color="primary" label="Donate Now" size="lg" to="/donate" class="q-px-xl">
              <font-awesome-icon icon="fa-solid fa-coins" class="q-mr-sm" />
            </q-btn>
          </div>
        </div>
      </div>
    </section>

    <!-- Item Cards Section -->
    <section class="cards-section q-pa-xl bg-grey-2">
      <div class="container">
        <h2 class="text-h4 text-center q-mb-lg">Our Initiatives</h2>
        <div class="row q-col-gutter-lg">
          <div v-for="card in cards" :key="card.id" class="col-12 col-md-4">
            <q-card class="full-height" v-scroll-fire="handleScrollFire">
              <q-img :src="card.image" height="200px">
                <div class="absolute-bottom text-subtitle2 text-center" style="background-color: rgba(0, 0, 0, 0.3);">
                  {{ card.title }}
                </div>
              </q-img>
              <q-card-section>
                <div class="text-h6 q-mb-xs">
                  <font-awesome-icon :icon="card.icon" size="lg" class="q-mr-sm" />
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
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        v-show="showScrollToTop"
        fab
        icon="keyboard_arrow_up"
        color="primary"
        @click="scrollToTop"
      />
    </q-page-sticky>
  </q-page>
</template>

<style lang="scss" scoped>
.hero-banner {
  background: linear-gradient(45deg, #1976D2, #0D47A1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.rounded-borders {
  border-radius: 12px;
}

.full-height {
  height: 100%;
}

.rotate-animation {
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
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
