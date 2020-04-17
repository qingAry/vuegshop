import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart  from '@/pages/ShopCart'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
// 个人中心的相关跳转路由
import Center from '@/pages/Center'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Trade from '@/pages/Trade'
import myOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
import store from '@/store'
/* 所有静态路由配置的数组*/
export default [
  {
    path: '/',
    component: Home
  },

  {
    name:'search',
    path: '/search/:keyword?', // params参数可传可不传 问号指定
    component: Search
  },
  {
     path:'/addcartsuccess',
     component: AddCartSuccess,
    //只有携带的skuId和skuNum以及sessionStorage中有skuInfo数据, 才能查看添加购物车成功的界面
     beforeEnter(to,from,next){
      //  console.log(to)
      let {skuId,skuNum} = to.query
      if( skuId && skuNum && JSON.parse(sessionStorage.getItem('ADD_CART_KEY'))){
         next()
      }else{
        next(from.path)
      }
     }
  },
  {
    path: '/shopcart',
    component: ShopCart,
  },
  {
    path: '/register',
    component: Register,
    meta: { // 需要隐藏footer的路由配置
      isHideFooter: true
    }
  },
  {
    name: '/detail',
    path: '/detail/:mid',
    component:Detail,
  },
  {
    path: '/login',
    component: Login,
    meta:{
      isHideFooter: true
    },
    //只有没有登陆, 才能查看登陆界面 路由独享守卫
    beforeEnter: (to, from, next) => {
	    if(store.state.user.userInfo.name){
        next('/')
      }else{
        // 如果满足条件直接放行
        next()
      }
    }

  },
  {
    path: '/search',
    component: Login,
    meta:{
      isHideFooter: true
    }
  },
  {
    path: '/center',
    component: Center,
    children:[
    {
      path: '/center/myorder',
      component: myOrder,
    },
    {
      path: '/center/grouporder',
      component: GroupOrder,
    },
    { // 自动跳转路由
      path: '/', 
      redirect: '/center/myorder'
    }
  ]
  },
  {
    path: '/pay',
    component: Pay,
    props: route => ({orderId : route.query.orderId}),
     //只能从交易界面, 才能跳转到支付界面
    //路由独享守卫
    beforeEnter(to,from,next){
      if(from.path === '/trade'){
        next()
      }else{
        next('/shopcart')
      }
    }
  },
  {
    path: '/paysuccess',
    component: PaySuccess,
    //只能从交易界面, 才能跳转到支付界面
    //路由独享守卫
    beforeEnter(to,from,next){
      if(from.path === '/pay'){
        next()
      }else{
        next('/shopcart')
      }
    }
  },
  {
    path: '/trade',
    component: Trade,
    //只能从购物车界面, 才能跳转到交易界面
    //路由独享守卫
    beforeEnter(to,from,next){
      if(from.path === '/shopcart'){
        next()
      }else{
        next('/')
      }
    }
  }
]
