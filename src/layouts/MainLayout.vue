<script lang="ts" setup>
import ConnectSolanaWallets from 'components/ConnectSolanaWallets.vue';
import { useQuasar } from 'quasar';
import { computed } from 'vue';

const $q = useQuasar();

const logoSrc = computed(() => !$q.dark.isActive ? '/assets/images/logos/solpaw-np-light-150.png' : '/assets/images/logos/solpaw-np-dark-150.png');

defineOptions({
  name: 'MainLayout',
});

</script>


<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class=" !$q.dark.isActive ? 'gradient-header-light': 'gradient-header-dark'" reveal>
      <q-toolbar>
        <q-toolbar-title>
          <router-link :to="{ name: 'Home' }">
            <img :src="logoSrc" alt="Solana Paw Nature Patron Logo" class="q-mt-md" height="60" />
          </router-link>
        </q-toolbar-title>
        <div class="q-mr-sm">
          <q-btn v-if="$route.name !== 'Home'" :ripple="false" :to="{name: 'Home'}" dense flat icon="home"
                 push />

          <q-btn :color="$q.dark.isActive ? 'yellow-6' :'blue-6' "
                 :icon="$q.dark.isActive ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" class="q-pa-sm"
                 dense
                 flat
                 push
                 @click="$q.dark.toggle" />
        </div>

        <ConnectSolanaWallets v-if="$q.platform.is.desktop" />
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<style lang="scss" scoped>

.gradient-header-light {
  background-color: $primary;
  background-image: linear-gradient($primary, white);
}

.gradient-header-dark {
  background-color: $dark-page;
}

</style>
