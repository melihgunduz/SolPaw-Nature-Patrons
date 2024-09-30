import { boot } from 'quasar/wrappers';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHandHoldingHeart, faCoins, faTree, faWater, faFish } from '@fortawesome/free-solid-svg-icons';

export default boot(({ app }) => {
  library.add(faHandHoldingHeart, faCoins, faTree, faWater, faFish);
  app.component('font-awesome-icon', FontAwesomeIcon);
});
