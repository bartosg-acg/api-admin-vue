import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//JQUERY globally
window.$ = window.jQuery = require('jquery');

//BOOSTSTRAP
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

//CUSTOM CSS
import '@/css/main.css'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.userToken) {
    next({ name: 'Login' })
  } else { 
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
