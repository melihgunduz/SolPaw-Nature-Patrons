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
        </q-toolbar-title>

        <ConnectSolanaWallets v-if="$q.platform.is.desktop" />
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

