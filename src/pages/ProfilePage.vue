<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { computed } from 'vue';
import { useWallet } from 'solana-wallets-vue';
import { PublicKey } from '@solana/web3.js';

const $q = useQuasar();
const { publicKey } = useWallet();


const isAdmin = computed(() => publicKey.value?.toBase58() === new PublicKey('D4fQPLmmSKESQPB9LjUru2S4QQccUHYdN5G5bGWTh2Uy').toBase58());


</script>

<template>
  <q-page v-if="isAdmin">
    <h1>admin page</h1>
    <div :class="[$q.screen.lt.sm ? 'column' : 'row justify-around', 'q-mt-md']">
      <div :class="[$q.screen.lt.sm ? 'q-mx-md' : 'column col-4']">
        <q-card class="full-height">
          <q-card-section>
            <div class="text-h5">Donations</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad adipisci alias asperiores culpa deleniti
              earum, fugit id ipsam laboriosam minima necessitatibus odio odit quasi repudiandae sapiente sit, velit
              voluptates.
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div :class="[$q.screen.lt.sm ? 'q-mx-md q-mt-md' : 'column col-4']">
        <q-card class="full-height">
          <q-card-section>
            <div class="text-h5">Donations</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab blanditiis cupiditate deleniti dolorum
              eaque earum eveniet excepturi facere id illo impedit itaque maxime non odit quia, quod suscipit tenetur
              vel.
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
  <q-page v-else>
    <div :class="[$q.screen.lt.sm ? 'column' : 'row justify-around', 'q-mt-md']">
      <div :class="[$q.screen.lt.sm ? 'q-mx-md' : 'column col-4']">
        <q-card class="full-height">
          <q-card-section>
            <div class="text-h5">Donations</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad adipisci alias asperiores culpa deleniti
              earum, fugit id ipsam laboriosam minima necessitatibus odio odit quasi repudiandae sapiente sit, velit
              voluptates.
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div :class="[$q.screen.lt.sm ? 'q-mx-md q-mt-md' : 'column col-4']">
        <q-card class="full-height">
          <q-card-section>
            <div class="text-h5">Donations</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab blanditiis cupiditate deleniti dolorum
              eaque earum eveniet excepturi facere id illo impedit itaque maxime non odit quia, quod suscipit tenetur
              vel.
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
</style>
