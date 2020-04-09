import Vue from 'vue'
import App from './App.vue'
//import store from './store'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'
import 'swiper/css/swiper.min.css'
// 轮播图
import Carousel from './components/Carousel'
import './mock/mockServer' // 加载mock接口的主模块

Vue.config.productionTip = false
//全局注册
Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
new Vue({
  router,//注册路由器
  render: h => h(App),
  store, //注册vuex的仓库store
}).$mount('#app')
