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
        <Floor v-for = "floor in floors" :key = "floor.id" :floor = "floor"/>
        <!--商标-->
        <Brand/>
 </div>
</template>

<script>
import listContainer from './listContainer'
import todayRecommend from './todayRecommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import { mapState } from 'vuex'
export default {
  name:'Home',
  components:{
    listContainer,
    todayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted(){
    //触发事件调用
    this.$store.dispatch('getBanners');
    this.$store.dispatch('getFloors')
  },
  computed:{
    ...mapState({
      floors: state => state.home.floors
    })
  }
}
</script>

<style lang='less' scoped>

     
</style>

