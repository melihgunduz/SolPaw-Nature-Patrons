<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { useWallet } from 'solana-wallets-vue';
import { PublicKey } from '@solana/web3.js';

const $q = useQuasar();
const { publicKey, wallet } = useWallet();


const isAdmin = computed(() => publicKey.value?.toBase58() === new PublicKey('D4fQPLmmSKESQPB9LjUru2S4QQccUHYdN5G5bGWTh2Uy').toBase58());

const collectionInfo = ref({
  title: '',
  description: '',
  targetAmount: 0,
  totalCollected: 0,
  startDate: '',
  endDate: '',
});

function createCollection() {
  console.log(wallet.value?.adapter);
}


</script>

<template>
  <q-page v-if="isAdmin">
    <div :class="[$q.screen.lt.sm ? 'column' : 'row justify-center', 'q-mt-md']">
      <div :class="[$q.screen.lt.sm ? 'q-mx-md' : '']">
        <q-card style="max-width: 300px">
          <q-card-section>
            <div class="text-h5">New collection</div>
          </q-card-section>
          <q-card-section class="q-py-none" style="max-width: 300px">
            <q-input v-model="collectionInfo.title" class="q-mb-sm" dense label="Name" outlined
                     type="text" />
            <q-input v-model="collectionInfo.description" class="q-mb-sm" dense label="Description" outlined
                     type="text" />
            <q-input v-model="collectionInfo.targetAmount" class="q-mb-sm" dense label="Target amount" outlined
                     type="number" />
            <q-input v-model="collectionInfo.startDate" class="q-mb-sm" dense label="Start date" outlined
                     type="text" />
            <q-input v-model="collectionInfo.endDate" dense label="End date" outlined
                     type="text" />
          </q-card-section>
          <q-card-actions align="center" class="q-px-md">
            <q-btn class="full-width" color="green" icon="create" label="Craete collection" no-caps
                   @click="createCollection" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
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
