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
// const isAdmin = computed(() => publicKey.value?.toBase58() === new PublicKey('D4fQPLmmSKESQPB9LjUru2S4QQccUHYdN5G5bGWTh2Uy').toBase58());

// Convert adminWallets to PublicKey instances for comparison
const adminPublicKeys = adminWallets.map(wallet => new PublicKey(wallet));

const isAdmin = computed(() => {
  if (!publicKey.value) return false; // Handle case where publicKey is not available
  return adminPublicKeys.some(adminKey =>
    publicKey.value?.toBase58() === adminKey.toBase58(),
  );
});

type CollectionType = {
  collectionAddress: string,
  collectionName: string,
  creatorName: string,
  owner: string
}

const nftCollections = ref<CollectionType[]>([]);
const options = ref<CollectionType[]>([]);
const selectedCollection = ref<CollectionType | null>(null);

const collectionInfo = ref({
  title: '',
  description: '',
  targetAmount: 0,
  totalCollected: 0,
  startDate: '', // shows DD/MM/YYYY format emits YYYY-DD-MM format
  endDate: '',
});

const tokenInfo = ref({
  title: '',
  description: '',
});

const collectionErrors = ref({
  title: '',
  description: '',
  targetAmount: '',
  startDate: '',
  endDate: '',
});

const tokenErrors = ref({
  title: '',
  description: '',
  collectionName: '',
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

const validateToken = () => {
  tokenErrors.value = {
    title: tokenInfo.value.title ? '' : 'Name is required',
    description: tokenInfo.value.description ? '' : 'Description is required',
    collectionName: selectedCollection.value?.collectionName ? '' : 'Collection name is required',
  };

  return !Object.values(tokenErrors.value).some(error => error);
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

function getNftCollections() {
  axios.get('http://localhost:5001/api/nftCollections/collections')
    .then((val) => nftCollections.value = val.data).catch((err) => console.log(err));
}


function collectionFilterFn(val: string, update: (fn: () => void) => void) {
  if (val === '') {
    update(() => {
      options.value = nftCollections.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = nftCollections.value.filter(v =>
      v.collectionName.toLowerCase().includes(needle),
    );
  });
}

function collectionsFocusFn() {
  if (nftCollections.value.length > 0) {
    return;
  } else {
    getNftCollections();
  }
}

function createTokenInCollection() {
  console.log(selectedCollection.value);
  if (validateToken()) {
    axios.post('http://localhost:5001/api/tokens/create', {
      collectionNftAddress: selectedCollection.value?.collectionAddress,
      tokenName: tokenInfo.value.title,
      tokenSymbol: 'TST',
      tokenDesc: 'lorem',
      customerPubKey: publicKey.value,
    }).then((val) => console.log(val)).catch((err) => console.log(err));
  } else {
    $q.notify({
      message: 'Fill empty token inputs',
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
      <div :class="[$q.screen.lt.sm ? 'q-mx-md' : '']">
        <q-card class="column items-center" style="max-width: 600px">
          <q-card-section>
            <div class="text-h5">Create new token</div>
          </q-card-section>
          <q-card-section horizontal>
            <q-card-section class="q-py-none" style="max-width: 300px">
              <q-input v-model="tokenInfo.title" :rules="[val => !!val || 'Token name is required']"
                       class="q-mb-sm" dense hide-bottom-space
                       label="Name" outlined type="text" />
              <q-input v-model="tokenInfo.description" :rules="[val => !!val || 'Token description is required']"
                       class="q-mb-sm" dense hide-bottom-space label="Description"
                       outlined
                       type="text" />
            </q-card-section>
            <q-card-section class="q-py-none" style="max-width: 300px">
              <q-select
                v-model="selectedCollection"
                :options="options"
                :rules="[val => !!val || 'Collection is required']"
                clearable
                input-debounce="0"
                label="Select NFT Collection"
                map-options
                option-label="collectionName"
                option-value="collectionAddress"
                use-input
                @filter="collectionFilterFn"
                @focus="collectionsFocusFn"
              >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-select>
            </q-card-section>
          </q-card-section>
          <q-card-actions align="center" class="q-pa-md">
            <q-btn class="full-width" color="green" icon="create" label="Create token" no-caps
                   @click="createTokenInCollection"
            />
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
