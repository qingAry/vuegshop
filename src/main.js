import Vue from 'vue'
import App from './App.vue'
//import store from './store'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'
import Pagination from './components/Pagination'
import detail from './components/'
import 'swiper/css/swiper.min.css'
// 轮播图
import Carousel from './components/Carousel'
import './mock/mockServer' // 加载mock接口的主模块

Vue.config.productionTip = false
//全局注册
Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination',Pagination)
new Vue({
  router,//注册路由器
  render: h => h(App),
  store, //注册vuex的仓库store
   //全局事件总线 让所有的组件都能看到
   beforeCreate(){
    Vue.prototype.$bus = this;
   }
}).$mount('#app')
