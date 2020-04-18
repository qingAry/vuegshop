import Vue from 'vue'
import App from './App.vue'
//import store from './store'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'
import Pagination from './components/Pagination'
import 'swiper/css/swiper.min.css'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
// 轮播图
import Carousel from './components/Carousel'
import './mock/mockServer' // 加载mock接口的主模块
// 引入接口api 包含所有方法的对象
import * as API from '@/api'
// 引入element-ui中引入的组件
import '@/element'
//引入懒加载图片
import loading from '@/assets/images/loading.gif'

//将接口对象放到vue原型中使用,方便组件中进行调用使用
Vue.prototype.$API = API

Vue.use(VueLazyload, {
  loading
})

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
