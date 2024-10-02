<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useWallet } from 'solana-wallets-vue';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useQuasar } from 'quasar';

const { connected } = useWallet();
const $q = useQuasar();

const donationAmount = ref('');
const totalRaised = ref(1250);
const numberOfDonors = ref(78);
const goal = ref(2000);
const progress = ref(totalRaised.value / goal.value);
const recentDonations = ref([]);

const fetchRecentDonations = async () => {
  try {
    const response = await fetch('http://localhost:5001/api/donations/recent');
    if (!response.ok) {
      throw new Error('Failed to fetch donations');
    }
    const donations = await response.json();

    recentDonations.value = donations.map(donation => ({
      id: donation._id,
      name: donation.donorName || 'Anonymous',
      amount: donation.amount,
      date: new Date().toISOString().split('T')[0],
      nftGranted: donation.nftGranted
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

onMounted(() => {
  fetchRecentDonations();
});

const clearInput = () => {
  if (donationAmount.value === '0') {
    donationAmount.value = '';
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

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: publicKey.value,
      toPubkey: new PublicKey('5u2uYbSDCFW5U3X1mNZGVRMzRD3jK7t6VQGqfvSxE2nq'),
      lamports: Number(donationAmount.value) * LAMPORTS_PER_SOL,
    }),
  );

  try {
    const signature = await sendTransaction(transaction, connection);
    console.log(signature);
  } catch (e: unknown) {
    return;
  }

  totalRaised.value += Number(donationAmount.value);
  numberOfDonors.value += 1;
  progress.value = totalRaised.value / goal.value;

  const name = publicKey.value ? publicKey.value.toString() : 'Anonymous';
  recentDonations.value.unshift({
    id: new Date().getTime().toString(),
    name: name,
    amount: Number(donationAmount.value),
    date: new Date().toISOString().split('T')[0],
    nftGranted: false,
  });
  donationAmount.value = '';
};
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
