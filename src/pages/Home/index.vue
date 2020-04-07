<template>
 <div class="middleContent">
   <!-- 商品分类导航 -->  
        <TypeNav/>
        <!--列表-->
        <listContainer/>
        <!--今日推荐-->
        <todayRecommend/>
        <!-- 商品排行 -->
        <Rank/>
        <!-- 猜你喜欢 -->
        <Like/>
        <!--楼层-->
        <Floor/>
        <!--楼层-->
        <Floor/>
        <!--商标-->
        <Brand/>
 </div>
</template>

<script>
import TypeNav from './TypeNav'
import listContainer from './listContainer'
import todayRecommend from './todayRecommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
export default {
name:'Home',
components:{
  TypeNav,
  listContainer,
  todayRecommend,
  Rank,
  Like,
  Floor,
  Brand
}
}
</script>

<style lang='less' scoped>

     
</style>

