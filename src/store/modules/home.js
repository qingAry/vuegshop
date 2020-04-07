// 请求ajax的数据 
import {reqBaseCategoryList}  from '@/api'

export default {
  state: {
    baseCategoryList: [], // 所有分类的数组
    
   },
  mutations: {
    RECEIVE_BASE_CATEGORY_LIST(state,list){
    //将请求过来的数据给列表
     state.baseCategoryList = list.splice(0,list.length-2); //请求的数据要比实际的长度小2
    }
   },
  actions: { 
    async getBaseCategoryList({ commit }){
      //再actions中发送ajax请求
      let result = await reqBaseCategoryList();
      // 里面有个状态码
      if(result.code === 200){
        let list = result.data;
        // 处理数据，并交给mutations进行处理
        commit('RECEIVE_BASE_CATEGORY_LIST', list)
      }
    }
   },
  getters: {  }
}