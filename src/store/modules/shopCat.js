 // 请求ajax的数据 
 import { reqAddToCart,reqCartList,reqCheckCart,reqDeleteCart }  from '@/api'


 const state =  {
     cartList: [],  // 所有分类的数组   
    }
   
    const mutations = {
      RECEIVE_CART_LIST(state,cartList){
        state.cartList = cartList
      }
    }
 
    const actions ={ 
      async getCartList({commit}){
        const result = await reqCartList();
        if(result.code === 200){
          let cartList = result.data;
          commit('RECEIVE_CART_LIST',cartList)
        }

      },
      async addToCart ({commit}, {skuId, skuNum}) {
        //在每次执行都在原来的基础上，添加指定数量该商品
        const result = await reqAddToCart(skuId, skuNum)
        //用来处理错误的信息
        if(result.code !== 200){
          throw new Error('添加到购物车失败')
      }
      },
      // 选中
      async getCheckCart({commit},{skuId,isChecked}){
        // console.log('getCheckCart',skuId,isChecked)
        const result = await reqCheckCart(skuId,isChecked)
        //用来处理错误的信息
        if(result.code !== 200){
          throw new Error('切换状态失败')
      }
    },
    //删除当前指定的某项  
    async getDeleteCart({commit},skuId){
      const result = await reqDeleteCart(skuId)
      //用来处理错误的信息
        if(result.code !== 200){
          throw new Error('删除失败')
      }
    }
  }
 
    const getters = { 
      /* 总数量 */
      totalNum(state){
        const cartList = state.cartList;
        //使用了reduce更简便一些，进行叠加
        return cartList.reduce((pre,item) => {
          // if(item.isChecked === 1){
          //  return pre + item.skuNum
          // }else{
          //   return pre
          // }
          return item.isChecked === 1 ? pre + item.skuNum : pre
        },0)
           
      },
      /* 总价格 */
      totalPrice(state){
         const cartList = state.cartList;
         let totalPrice = 0;
         cartList.forEach((item) => {
            if( item.isChecked === 1){
              totalPrice += item.skuPrice * item.skuNum;
            }
         })
         return totalPrice;
      },
      /* 是否全选 */
      isAllChecked(state){
        const cartList = state.cartList;
        return cartList.every((item,index) => item.isChecked === 1)
      },
      /* 删除所有选中 */
      deleteCheckedCart(state){
        const cartList = state.cartList;
        return cartList.filter( item => item.isChecked === 1)
      }

    }
   
 
 export default {
     state,
     actions,
     mutations,
     getters
 }