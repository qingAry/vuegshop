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
export default {
  name: 'App',
  components : {
    Header,
    Footer
  }
}
</script>

<style lang="less" scoped>

</style>
