<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { useWallet } from 'solana-wallets-vue';
import { PublicKey } from '@solana/web3.js';
import axios from 'axios';

const $q = useQuasar();
const { publicKey } = useWallet();

// Add your public key to be admin and create collections
const adminWallets = ['2JzZBbMECNE2wuEjph1QjqoaCGJm6gJWYrCEpVSKBAkm', 'D4fQPLmmSKESQPB9LjUru2S4QQccUHYdN5G5bGWTh2Uy'];

// Convert adminWallets to PublicKey instances for comparison
const adminPublicKeys = adminWallets.map(wallet => new PublicKey(wallet));

const isAdmin = computed(() => {
  if (!publicKey.value) return false; // Handle case where publicKey is not available
  return adminPublicKeys.some(adminKey =>
    publicKey.value?.toBase58() === adminKey.toBase58(),
  );
});


const collectionInfo = ref({
  title: '',
  description: '',
  targetAmount: 0,
  totalCollected: 0,
  startDate: '', // shows DD/MM/YYYY format emits YYYY-DD-MM format
  endDate: '',
});

const collectionErrors = ref({
  title: '',
  description: '',
  targetAmount: '',
  startDate: '',
  endDate: '',
});


const validateCollection = () => {
  collectionErrors.value = {
    title: collectionInfo.value.title ? '' : 'Name is required',
    description: collectionInfo.value.description ? '' : 'Description is required',
    targetAmount: collectionInfo.value.targetAmount > 0 ? '' : 'Target amount must be greater than 0',
    startDate: collectionInfo.value.startDate ? '' : 'Start date is required',
    endDate: collectionInfo.value.endDate ? '' : 'End date is required',
  };

  return !Object.values(collectionErrors.value).some(error => error);
};


async function createCollection() {
  if (validateCollection()) {
    axios.post('http://localhost:5001/api/nftCollections/create', {
      pubKey: publicKey.value,
      collectionName: collectionInfo.value.title,
      collectionSymbol: 'TST',
      collectionDesc: collectionInfo.value.description,
    }).then((val) => console.log(val)).catch((err) => console.log(err));
  } else {
    $q.notify({
      message: 'Fill empty collection inputs',
      color: 'red',
      position: 'top',
      timeout: 2000,
    });
  }
}


</script>

<template>
  <q-page v-if="isAdmin">
    <div :class="[$q.screen.lt.sm ? 'column' : 'row justify-center q-col-gutter-sm', 'q-mt-md']">
      <div :class="[$q.screen.lt.sm ? 'q-mx-md' : '']">
        <q-card style="max-width: 300px">
          <q-card-section>
            <div class="text-h5">Create new collection</div>
          </q-card-section>
          <q-card-section class="q-py-none" style="max-width: 300px">
            <q-form @submit.prevent="createCollection">

              <q-input v-model="collectionInfo.title" :rules="[val => !!val || 'Name is required']" class="q-mb-sm"
                       dense
                       label="Name"
                       outlined type="text"
              />
              <q-input v-model="collectionInfo.description" :rules="[val => !!val || 'Description is required']"
                       class="q-mb-sm" dense label="Description"
                       outlined

                       type="text" />
              <q-input v-model="collectionInfo.targetAmount"
                       :rules="[val => val > 0 || 'Target amount must be greater than 0']" class="q-mb-sm" dense
                       label="Target amount"
                       outlined

                       type="number" />
              <q-input v-model="collectionInfo.startDate" :rules="[val => !!val || 'Start date is required']"
                       class="q-mb-sm" dense
                       label="Start date"

                       outlined type="date" />
              <q-input v-model="collectionInfo.endDate" :rules="[val => !!val || 'End date is required']" dense
                       label="End date"
                       outlined

                       type="date" />
            </q-form>
          </q-card-section>
          <q-card-actions align="center" class="q-pa-md">
            <q-btn class="full-width" color="green" icon="create" label="Create collection" no-caps
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
