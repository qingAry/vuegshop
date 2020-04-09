<template>
   <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel,index) in carousels" :key='carousel.id'>
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Swiper from 'swiper'
  export default {
    name: 'Carousel',
    props:{
      carousels: Array
    },
    mounted(){
    //  console.log('mounted()',this.carousels)
    },
    watch:{
      //检测banners/floors数据是否发生改变
      carousels: {
        immediate: true,//执行mounted之后，会重新执行carousels的内容
        handler () {
          //这块属于优化，使用immediate: true之后，在home中的index.vue中使用了floor
          //此时会默认执行一次
          if(this.carousels.length === 0) return;
          //console.log('handler()',this.carousels)
          //数据发生改变，才能异步更新页面
          // new Swiper ('.swiper-container', {
          //dom更新之后，才调用此回调函数,防止异步请求数据还没有请求到
          this.$nextTick(
            () => {
              new Swiper (this.$refs.swiper, {
              //direction: 'vertical', // 垂直切换选项
              loop: true, // 循环模式选项 
              // 如果需要分页器
              pagination: {
                  el: '.swiper-pagination',
              },
              // 如果需要前进后退按钮
              navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
              }

              })
            });
        }
      }
    }
  }
</script>

<style scoped>

</style>