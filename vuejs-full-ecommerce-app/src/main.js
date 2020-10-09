import Commerce from '@chec/commerce.js';

import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import 'bootstrap';

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;
const commerce = new Commerce("pk_1804536f3a6e73f039fb5739829ff9d02037fbdbeb51a", true);

Vue.mixin({
  beforeCreate() {
    this.$commerce = commerce;
  },
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
