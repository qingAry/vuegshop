// 请求ajax的数据 
import { reqProductDetails }  from '@/api'

export default {
  state: {
    productdetails: {}, // 所有分类的数组    
   },
  mutations: {
    RECEIVE_PRODUCT_DETAILS(state,productdetails){
      state.productdetails = productdetails;
    }
   },
  actions: { 
    // 发送ajax请求得到productdetails数据
   async getProductDetails({commit},mid){
      let result = await reqProductDetails(mid);
      if(result.code === 200){
        let productdetails = result.data;
        commit('RECEIVE_PRODUCT_DETAILS',productdetails)
      }
    }
   },
  getters: { 
    // 简化读取的代码
    categoryView(state){
      return state.productdetails.categoryView || {};
    },
    spuSaleAttrList(state){
      return state.productdetails.spuSaleAttrList || []
    },
    skuInfo(state){
      return state.productdetails.skuInfo || {}
    },
    skuImageList(state){
      let skuInfo = state.productdetails.skuInfo
      //判断当前的skuInfo是空吗？如果是设置一个空的数组给skuInfo
      //那么skuImageList就不会出错了
      return  skuInfo ? skuInfo.skuImageList : []
    },
   }
}