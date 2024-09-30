<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal>
      <q-toolbar>

        <q-toolbar-title>
          SolPaw Nature Patrons
        </q-toolbar-title>

        <ConnectSolanaWallets />
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>

import ConnectSolanaWallets from 'components/ConnectSolanaWallets.vue';


defineOptions({
  name: 'MainLayout',
});

</script>
