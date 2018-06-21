import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

import store from "./store"
import router from './routes'


Vue.use(Buefy)
Vue.use(require('vue-moment'));


Vue.config.productionTip = false



new Vue({
  router: router,
  render: h => h(App),
  store
}).$mount('#app')
