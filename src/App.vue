<template>
<div>
  <!-- 头部 -->
  <Header/>
  <!-- 显示路由 -->
  <router-view></router-view>
  <!-- 尾部 -->
  <Footer v-else-if=""/>
</div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import {reqBaseCategoryList} from '@/api'
export default {
  name: 'App',
  
  async mounted(){
  //  let result = await reqBaseCategoryList()
  //  console.log(result)
  },  
  components : {
    Header,
    Footer
  },
  
}
</script>

<style lang="less" scoped>

</style>
