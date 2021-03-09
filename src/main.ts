import Vue from 'vue'
import App from './App.vue'
import Categroy from './model/CateEnum';
import store from './store';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
