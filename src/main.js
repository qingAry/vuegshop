import Vue from 'vue'
import App from './App.vue'
//import store from './store'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,//注册路由器
  render: h => h(App),
  store, //注册vuex的仓库store
}).$mount('#app')
