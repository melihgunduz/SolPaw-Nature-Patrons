<script lang="ts" setup>

import ConnectSolanaWallets from 'components/ConnectSolanaWallets.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();


defineOptions({
  name: 'MainLayout',
});

</script>


<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal>
      <q-toolbar>

        <q-toolbar-title>
          SolPaw Nature Patrons
          <q-btn v-if="$route.name !== 'Home'" :ripple="false" :to="{name: 'Home'}" flat icon="home" />
        </q-toolbar-title>

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

