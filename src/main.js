import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import MultiFiltersPlugin from './plugins/MultiFilters'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store  from './store';

Vue.use(MultiFiltersPlugin);
Vue.use(VueAxios, axios);

window.axios = axios.create({
  baseURL: 'https://api.airtable.com/',
  headers: {
    accept: 'application/json',
    'Content-type': 'application/json',
  },
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
