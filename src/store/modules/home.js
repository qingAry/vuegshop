// 请求ajax的数据 
import { reqBaseCategoryList , reqBanners , reqFloors }  from '@/api'

export default {
  state: {
    baseCategoryList: [], // 所有分类的数组
    banners:[],
    floors:[]
    
   },
  mutations: {
    RECEIVE_BASE_CATEGORY_LIST(state,list){
    //将请求过来的数据给列表
     state.baseCategoryList = list.splice(0,list.length-2); //请求的数据要比实际的长度小2
    },
    RECEIVE_BANNERS(state,banner){
      state.banners = banner;
    },
    RECEIVE_FLOORS(state,floor){
      state.floors = floor;
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
    },
    async getBanners({commit}){
       let result = await reqBanners();
      //  console.log('aaaaaaaaaaaaaaa');
       if(result.code === 200){
         let banner = result.data;
         commit('RECEIVE_BANNERS',banner)
       }
    },
    async getFloors({commit}){
      let result =  await reqFloors();
      if( result.code === 200 ){
        let floor = result.data;
         commit('RECEIVE_FLOORS',floor)
      }
    }
   },
  getters: {  }
}