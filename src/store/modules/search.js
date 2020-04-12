 // 请求ajax的数据 
import { reqProductList }  from '@/api'


const state =  {
    productList: {}, // 所有分类的数组   
   }
  
   const mutations = {
    RECEIVE_REQTRADEMARK_LIST(state,productList){
    //将请求过来的数据给列表
    state.productList = productList;
    }
   }

   const actions ={ 
    async getProductList({ commit }, searchParams){
      //发送ajax请求获取数据
     let result = await reqProductList(searchParams);
     //如果请求成功，则调用mutation中的方法，更新数据状态
     if(result.code === 200){
      let productList = result.data;
      commit('RECEIVE_REQTRADEMARK_LIST',productList)
     }
   }
  }

   const getters = { 
    //单独获得初始的数据的特定属性
    //品牌列表
    trademarkList(state){
      return state.productList.trademarkList || [];
    },
    attrsList(state){
      // 产品id/属性名/属性描述
      //属性列表
      return state.productList.attrsList || [];
    },
    //商品列表
    goodsList(state){
      return state.productList.goodsList || [];
    },
   }
  

export default {
    state,
    actions,
    mutations,
    getters
}