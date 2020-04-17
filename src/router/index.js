/* 路由器对象模块*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'
import store from '@/store'

// 声明使用vue的插件
Vue.use(VueRouter)

// 向外暴露一个路由器对象
let router =  new VueRouter({
  // mode: 'hash', // 路由路径带#号
  mode: 'history', // 路由路径不带#号
  
  // 配置应用中的所有路由
  routes,
  //滚动条默认滚动
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

  // 全局前置守卫
  //只有登陆了, 才能查看交易/支付/个人中心界面
  let pathRouter = ['/trade','/pay','/center']
  router.beforeEach((to,from,next) => {
    let targetPath = to.path;
    //判断是不是以pathRouter的元素开头的
   if(pathRouter.find( path => targetPath.indexOf(path) === 0)) {
      if(store.state.user.userInfo.name){
        next()
      }else{
        next('/login?redirect=' + targetPath)
      }
    } else {
      // 否则不需要检查, 直接放行
        next()
      }
  })


// 向外暴露一个路由器对象
export default router