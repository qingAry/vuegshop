import axios from 'axios';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

let ajax = axios.create({
  baseURL:'/mock',
  timeout:2000
})
// 进度条默认旋转去除
NProgress.configure({ showSpinner: false }) 

//请求拦截器
ajax.interceptors.request.use((config) => {
  NProgress.start();
  return config
})
//响应拦截器
ajax.interceptors.response.use((response) => {
  NProgress.done();
  return response.data;
},(error) => {
  NProgress.done();
  return Promise.reject(error);
}
)
// 向外暴露ajax
export default ajax