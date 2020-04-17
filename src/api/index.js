import ajax from './ajax' //所有的接口
import mockAjax from './mockAjax'
// 获取商品的三级目录
export  let  reqBaseCategoryList = () => ajax.get('/product/getBaseCategoryList')
export let reqBanners = () => mockAjax.get('/banners');
export let reqFloors = () => mockAjax.get('/floors');
//获取search商品列表
export  let  reqProductList = (searchParams) => ajax.post('/list',searchParams)
// reqProductList({})
export let reqProductDetails = (mid) => ajax.get(`/item/${mid}`)

// console.log(reqProductDetails(30))

//获取购物的接口请求函数
export const reqAddToCart = (skuID,skuNum) => ajax.post(`/cart/addToCart/${ skuID }/${ skuNum }`)
// 获取购物车数据列表
export const reqCartList = () => ajax.get('/cart/cartList')
//切换商品选中状态
export const reqCheckCart = (skuID,isChecked) => ajax.get(`/cart/checkCart/${skuID}/${isChecked}`)
//删除购物车商品
export const reqDeleteCart = (skuId) => ajax.delete(`/cart/deleteCart/${skuId}`)
//获取订单页详情
export const reqTrade = () => ajax.get(`/order/auth/trade`)
//登录
export const reqLogin = (mobile,password) => ajax.post("/user/passport/login",{mobile,password})
//注册
export const reqRegister = (userInfo) => ajax.post("/user/passport/register",userInfo)
//退出登录
export const reqLogout = () => ajax.get("/user/passport/logout")
//获取我的订单详情
export const reqMyorders = (page,limit) => ajax.get(`/order/auth/${page}/${limit}`)
//提交订单
export const reqSubmitOrder = ( tradeNo , orderInfo) => ajax({
  url:'/order/auth/submitOrder',
  method:'POST',
  params:{ tradeNo },
  data : orderInfo
})
//获取订单支付信息
export const reqOrderPayInfo = (orderId) => ajax.get(`/payment/weixin/createNative/${orderId}`)
//查看订单支付状态
export const reqOrderIsPay = (orderId) => ajax.get(`/payment/weixin/queryPayStatus/${orderId}`)