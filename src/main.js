import Vue from 'vue'
import App from './App.vue'
import router from './setup/router.js'
import store from './setup/store.js'
import globalMI from './mixins/globalMI.js';
import axios from 'axios'

//JQUERY globally
window.$ = window.jQuery = require('jquery');

//BOOSTSTRAP
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

//Font awesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

//CUSTOM CSS
import '@/css/main.css'

//layouts
import DefaultLayout from '@/layouts/MasterLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'

Vue.component('default-layout', DefaultLayout);
Vue.component('empty-layout', EmptyLayout);

Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.mixin(globalMI)

Vue.prototype.$apiLink = 'http://acgapi.local/univer/';

router.beforeEach((to, from, next) => {

  if (!router.options.allowedForGuest.includes(to.name) && !store.state.loggedIn) {
      next({ name: 'Login' });
  } else { 
    next();
  }

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
