// vuex的核心管理库
import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import user from './modules/user'

// 声明使用
Vue.use(Vuex);

//暴露vuex中的store对象
export default new Vuex.Store({
  // state, state的初始数据，再多模块下没有存在的意义
  // mutations,
  // actions,
  // getters,
  /*
  home的结构：
  home {
    baseCategoryList: [],
  }
   */
  modules: {
    home,
    user
  }
})