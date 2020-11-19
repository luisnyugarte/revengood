import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import MultiFiltersPlugin from './plugins/MultiFilters'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store  from './store';

Vue.use(MultiFiltersPlugin);
Vue.use(VueAxios, axios);

// Agregamos la URL base de nuestra API
axios.defaults.baseURL = 'http://localhost:80/wordpress/wordpress';

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
