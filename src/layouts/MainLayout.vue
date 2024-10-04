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
    <q-header reveal style="background-color: #2F4F4F">
      <q-toolbar>
        <q-toolbar-title>
          <div>
            <router-link :to="{ name: 'Home' }">
              <img :src="logoSrc" alt="Solana Paw Nature Patron Logo" class="q-mt-md" height="60" />
            </router-link>
          </div>
        </q-toolbar-title>
        <div class="q-mr-sm">
          <q-btn-dropdown color="primary" dropdown-icon="change_history" label="Menu" no-caps outline rounded size="md">
            <q-list>
              <q-item v-if="$q.platform.is.desktop && $q.screen.lt.sm">
                <q-item-section class="items-center">
                  <ConnectSolanaWallets v-if="$q.platform.is.desktop" />
                </q-item-section>
              </q-item>

              <q-item v-if="$route.name !== 'Home'" v-close-popup :to="{name: 'Home'}" clickable>
                <q-item-section class="items-center">
                  <q-icon name="home" size="sm" />
                </q-item-section>
              </q-item>

              <q-item v-if="$route.name !== 'Profile'" v-close-popup :to="{name: 'Profile'}" clickable>
                <q-item-section class="items-center">
                  <q-icon name="person" size="sm" />
                </q-item-section>
              </q-item>

              <q-item v-close-popup clickable
                      @click="$q.dark.toggle">
                <q-item-section class="items-center">
                  <q-icon :color="$q.dark.isActive ? 'yellow-6' :'blue-6' "
                          :name="$q.dark.isActive ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" size="sm" />
                </q-item-section>
              </q-item>


            </q-list>
          </q-btn-dropdown>
        </div>

        <ConnectSolanaWallets v-if="$q.platform.is.desktop && !$q.screen.lt.sm" />
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<style lang="scss" scoped>


</style>
