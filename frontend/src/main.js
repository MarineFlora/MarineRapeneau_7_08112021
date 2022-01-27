import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './assets/custom.scss'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

export const eventBus = new Vue();

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
