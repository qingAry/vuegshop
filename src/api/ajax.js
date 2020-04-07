import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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