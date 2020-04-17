 // 请求ajax的数据 
 import { reqTrade , reqOrderPayInfo }  from '@/api'


 const state =  {
     tradeDetails:{},
     payInfo:{}
    }
   
    const mutations = {
      //获取订单页的详情
      RECEIVE_Trade_Details(state,{tradeDetails}){
        //{tradeDetails}从对象解构出来
        state.tradeDetails = tradeDetails
      },
      // 获取支付信息详情
      RECEIVE_TRADE_PAYINFO(state,{payInfo}){
        //{payInfo}从对象解构出来
        state.payInfo = payInfo
      }
    }
 
    const actions ={ 
      //获取订单页详情
      async getTradeDetails({commit}){
        const result = await reqTrade();
        if(result.code === 200){
          console.log(result.data)
          const tradeDetails = result.data 
          commit('RECEIVE_Trade_Details',{tradeDetails}) //包含数据的对象
        }
      },
      async getPayInfo({commit},orderId){
        const result = await reqOrderPayInfo(orderId)
        if(result.code === 200){
          const payInfo = result.data;
          commit('RECEIVE_TRADE_PAYINFO' , { payInfo })
        }
      }
  }
 
    const getters = { 
     
    }
   
 
 export default {
     state,
     actions,
     mutations,
     getters
 }