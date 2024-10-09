<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useWallet } from 'solana-wallets-vue';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useQuasar } from 'quasar';
import axios from 'axios';

// Used for client side donor type
type RecentDonation = {
  id: string,
  name: string,
  amount: number,
  date: string,
  nftGranted: boolean,
}

// Used for server side donor type
type DbDonation = {
  _id: string,
  donorName: string,
  amount: number,
  date: string,
  nftGranted: boolean,
}

const { connected, publicKey } = useWallet();
const $q = useQuasar();

const donationAmount = ref('');
const totalRaised = ref(1250);
const numberOfDonors = ref(78);
const goal = ref(2000);
const progress = ref(totalRaised.value / goal.value);
const recentDonations = ref<RecentDonation[]>([]);

const tokenErrors = ref({
  collectionName: '',
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


onMounted(() => {
  fetchRecentDonations();
});

const clearInput = () => {
  if (donationAmount.value === '0') {
    donationAmount.value = '';
  }
};


const fetchRecentDonations = async () => {
  try {
    const response = await fetch('http://localhost:5001/api/donations/recent');

    if (!response.ok) {
      new Error('Failed to fetch donations');
    }
    const donations: DbDonation[] = await response.json();

    recentDonations.value = donations.map((donation: DbDonation) => ({
      id: donation._id,
      name: donation.donorName || 'Anonymous',
      amount: donation.amount,
      date: new Date().toISOString().split('T')[0],
      nftGranted: donation.nftGranted,
    }));
  } catch (error) {
    console.error('Error fetching recent donations:', error);
    $q.notify({
      message: 'Error fetching recent donations',
      color: 'red',
      position: 'top',
      timeout: 3000,
    });
  }
};

const postPaymentToAPI = async (amount: number, donorName: string) => {
  try {
    const response = await fetch('http://localhost:5001/api/payments/donate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        donationProjectId: '66fe53be97c27111cd6df104',
        donorName: donorName,
        amount: amount,
      }),
    });

    if (!response.ok) {
      new Error('Failed to send payment');
    }

    const result = await response.json();
    console.log('Payment posted successfully:', result);

    $q.notify({
      message: 'Payment recorded successfully!',
      color: 'green',
      position: 'top',
      timeout: 3000,
    });
  } catch (error) {
    console.error('Error posting payment:', error);
    $q.notify({
      message: 'Error recording payment',
      color: 'red',
      position: 'top',
      timeout: 3000,
    });
  }
};

const makeDonation = async () => {
  const connection = new Connection(clusterApiUrl('devnet'));
  const { publicKey, sendTransaction } = useWallet();

  if (!publicKey.value) {
    $q.notify({
      message: 'Invalid public key',
      color: 'red',
      position: 'top',
      timeout: 3000,
    });
    return;
  }

  if (!validateToken()) {
    $q.notify({
      message: 'Select collection',
      color: 'red',
      position: 'top',
      timeout: 3000,
    });
    return;
  }

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: publicKey.value,
      toPubkey: new PublicKey('5u2uYbSDCFW5U3X1mNZGVRMzRD3jK7t6VQGqfvSxE2nq'),
      lamports: Number(donationAmount.value) * LAMPORTS_PER_SOL,
    }),
  );

  try {
    const signature = await sendTransaction(transaction, connection).then(async () => {
      createTokenInCollection();
      totalRaised.value += Number(donationAmount.value);
      numberOfDonors.value += 1;
      progress.value = totalRaised.value / goal.value;

      const name = publicKey.value ? publicKey.value.toString() : 'Anonymous';

      recentDonations.value.unshift({
        id: new Date().getTime().toString(),
        name: name,
        amount: Number(donationAmount.value),
        date: new Date().toISOString().split('T')[0],
        nftGranted: true,
      });

      // Post payment to api
      await postPaymentToAPI(Number(donationAmount.value), name);

      donationAmount.value = '';
    });
    console.log('Transaction signature:', signature);
  } catch (e: unknown) {
    console.error('Error during transaction:', e);
    return;
  }
};

function getNftCollections() {
  axios.get('http://localhost:5001/api/nftCollections/collections')
    .then((val) => nftCollections.value = val.data).catch((err) => console.log(err));
}


const validateToken = () => {
  tokenErrors.value = {
    collectionName: selectedCollection.value?.collectionName ? '' : 'Collection name is required',
  };

  return !Object.values(tokenErrors.value).some(error => error);
};


function createTokenInCollection() {
  if (validateToken()) {
    axios.post('http://localhost:5001/api/tokens/create', {
      collectionNftAddress: selectedCollection.value?.collectionAddress,
      tokenName: `SP ${selectedCollection.value?.collectionName}`,
      tokenSymbol: 'SPW',
      tokenDesc: 'Thank you for your helps to make world great again.',
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


</script>

<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-8">
        <q-card class="project-details">
          <q-img height="300px" src="https://cdn.pixabay.com/photo/2015/04/23/22/01/tree-736888_1280.jpg">
            <div class="absolute-bottom text-h6 text-white q-pa-md" style="background: rgba(0,0,0,0.7);">
              Adopt a Rainforest
            </div>
          </q-img>
          <q-card-section>
            <div class="text-h5">Help Protect Our Rainforests</div>
            <p>Rainforests are crucial for maintaining Earth's biodiversity and regulating our climate. Your donation
              will help us protect these vital ecosystems from deforestation and support local communities.</p>
            <div class="text-h6 q-mt-md">Project Goals:</div>
            <ul>
              <li>Preserve 10,000 acres of rainforest</li>
              <li>Plant 100,000 native trees</li>
              <li>Support 50 local communities</li>
            </ul>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4 column justify-between">
        <q-card class="donation-for">
          <q-card-section>
            <div class="text-h6">Make a Donation</div>
            <q-input v-model="donationAmount" class="q-mt-md" label="Amount (SOL)" type="number" @focus="clearInput" />
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
          <q-card-actions>
            <q-btn :disable="Number(donationAmount) <= 0 || !connected" class="full-width q-mt-sm" color="primary"
                   label="Donate Now"
                   @click="makeDonation">
              <q-tooltip v-if="Number(donationAmount) <= 0"
                         class="bg-purple text-body2"
                         transition-hide="flip-left"
                         transition-show="flip-right"
              >
                Enter valid amount to make donation.
              </q-tooltip>
              <q-tooltip v-else-if="!$q.platform.is.desktop"
                         class="bg-purple text-body2"
                         transition-hide="flip-left"
                         transition-show="flip-right"
              >
                Please make donation on desktop for better experience. For now...
              </q-tooltip>
              <q-tooltip v-else-if="!connected"
                         class="bg-purple text-body2"
                         transition-hide="flip-left"
                         transition-show="flip-right"
              >
                Please connect your wallet first.
              </q-tooltip>
            </q-btn>
          </q-card-actions>
        </q-card>

        <q-card class="donation-stats q-mt-md">
          <q-card-section>
            <div class="text-h6">Donation Statistics</div>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label>Total Raised</q-item-label>
                  <q-item-label caption>{{ totalRaised }} SOL</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Number of Donors</q-item-label>
                  <q-item-label caption>{{ numberOfDonors }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Goal</q-item-label>
                  <q-item-label caption>{{ goal }} SOL</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-linear-progress :value="progress" class="q-mt-md" color="primary" />
            <div class="text-caption text-center q-mt-sm">{{ Math.round(progress * 100) }}% of goal reached</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Recent Donations -->
    <div class="col-12 q-mt-md">
      <q-card class="recent-donations">
        <q-card-section>
          <div class="text-h6">Recent Donations</div>
          <q-list>
            <q-item v-for="donation in recentDonations" :key="donation.id">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ donation.name.charAt(0) }}
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ donation.name }}</q-item-label>
                <q-item-label caption>Donated {{ donation.amount }} SOL</q-item-label>
                <q-item-label caption>NFT Granted: {{ donation.nftGranted ? 'Yes' : 'No' }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{ donation.date }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.project-details, .donation-form, .recent-donations {
  height: 100%;
}
</style>
