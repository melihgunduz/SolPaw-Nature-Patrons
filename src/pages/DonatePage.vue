<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Project Details -->
      <div class="col-12 col-md-8">
        <q-card class="project-details">
          <q-img height="300px" src="https://cdn.pixabay.com/photo/2015/04/23/22/01/tree-736888_1280.jpg">
            <div class="absolute-bottom text-h6 text-white q-pa-md" style="background: rgba(0,0,0,0.7);">
              Adopt a Rainforest
            </div>
          </q-img>
          <q-card-section>
            <div class="text-h5 q-mb-md">Help Protect Our Rainforests</div>
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

      <!-- Donation Form and Stats -->
      <div class="col-12 col-md-4">
        <q-card class="donation-form q-mb-md">
          <q-card-section>
            <div class="text-h6">Make a Donation</div>
            <q-input v-model="donationAmount" class="q-mt-md" label="Amount (SOL)" type="number" @focus="clearInput" />
            <q-btn :disable="Number(donationAmount) <= 0" class="full-width q-mt-sm" color="primary"
                   label="Donate Now"
                   @click="makeDonation">
              <q-tooltip v-if="Number(donationAmount) <= 0"
                         class="bg-purple text-body2"
                         transition-hide="flip-left"
                         transition-show="flip-right"
              >
                Enter valid amount to make donation.
              </q-tooltip>
            </q-btn>
          </q-card-section>
        </q-card>

        <q-card class="donation-stats">
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

      <!-- Recent Donations -->
      <div class="col-12">
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
                </q-item-section>
                <q-item-section side>
                  {{ donation.date }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const donationAmount = ref('');
const totalRaised = ref(1250);
const numberOfDonors = ref(78);
const goal = ref(2000);
const progress = ref(totalRaised.value / goal.value);

const recentDonations = ref([
  { id: 1, name: 'Alice', amount: 5, date: '2023-06-01' },
  { id: 2, name: 'Bob', amount: 10, date: '2023-05-31' },
  { id: 3, name: 'Charlie', amount: 2, date: '2023-05-30' },
  // Add more recent donations as needed
]);


const clearInput = () => {
  if (donationAmount.value === '0') {
    donationAmount.value = ''; // Clear the input if it's currently 0
  }
};


const makeDonation = () => {
  // Implement donation logic here
  console.log(`Donation of ${donationAmount.value} SOL made`);
  // Update stats and recent donations
  totalRaised.value += Number(donationAmount.value);
  numberOfDonors.value += 1;
  progress.value = totalRaised.value / goal.value;
  // Add new donation to recent donations
  recentDonations.value.unshift({
    id: recentDonations.value.length + 1,
    name: 'Anonymous',
    amount: Number(donationAmount.value),
    date: new Date().toISOString().split('T')[0],
  });
  // Reset donation amount
  donationAmount.value = '';
};
</script>

<style lang="scss" scoped>
.project-details, .donation-form, .donation-stats, .recent-donations {
  height: 100%;
}
</style>
