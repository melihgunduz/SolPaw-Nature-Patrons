<script lang="ts" setup>
import ConnectSolanaWallets from 'components/ConnectSolanaWallets.vue';
import { useQuasar } from 'quasar';
import { computed } from 'vue';

const $q = useQuasar();

const logoSrc = computed(() => $q.dark.isActive ? '/assets/images/logos/solpaw-np-light-150.png' : '/assets/images/logos/solpaw-np-dark-150.png');

defineOptions({
  name: 'MainLayout',
});

</script>


<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal>
      <q-toolbar>

        <q-toolbar-title>
          <router-link :to="{ name: 'Home' }">
            <img :src="logoSrc" alt="Solana Paw Nature Patron Logo" height="60" class="q-mt-md" />
          </router-link>
        </q-toolbar-title>
        <q-btn v-if="$route.name !== 'Home'" :ripple="false" :to="{name: 'Home'}" flat icon="home" />

        <q-btn :icon="$q.dark.isActive ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" flat push round
               @click="$q.dark.toggle" />

        <ConnectSolanaWallets v-if="$q.platform.is.desktop" />
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

