import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 引入store仓库
import store from '@/store'

//默认配置
let ajax = axios.create({
  baseURL: "/api",
  timeout: 10000
})

// 进度条默认旋转去除
NProgress.configure({ showSpinner: false }) 

//请求拦截器
ajax.interceptors.request.use((config) => {
  //进度条
   NProgress.start();
   //游客：所有请求都要携带userTempId的请求头 才能在每次访问购物车都不发生变化
   config.headers.userTempId = store.state.user.userTempId
   //客户：主要是对登录的用户 只能进行登录每个用户都要自己token以及购物信息
   let token = store.state.user.userInfo.token;
   if(token){
    // 如果登录成功，每次都带上响应的请求头
    config.headers['token'] = token
   }
   return config; //必须返回时传入的参数
})
//响应拦截器
ajax.interceptors.response.use(
  // 一个成功的回调
  (response) => {
    NProgress.done()
    return response.data;
  },
  // 一个失败的回调
  (error) => {
    NProgress.done()
    return Promise.reject(error); //后面的请求也能够处理
  }
)

export default ajax