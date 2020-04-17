<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="mask" ref="mask" @mousemove="moveZoom"></div>
    <div class="big">
      <img :src="bigImgUrl" ref="bigImg"/>
    </div>
    <div class="small" ref="small"></div>
  </div>
</template>

<script>
  //引入throttle，进行节流
  import throttle from 'lodash/throttle'
  export default {
    name: "Zoom",
    props:{
      imgUrl:String,
      bigImgUrl:String,
    },
    mounted(){
      // console.log('this.imgUrl'+this.imgUrl)
      //求出的遮罩的宽度 并尽心保存
      this.maskWeight = this.$refs.mask.clientWidth/2
    },
    methods:{
      // 鼠标移入事件，是高频次触发
      moveZoom : throttle(function(event) {
        // console.log('object')
        let { offsetX , offsetY } = event;
        let maskWeight = this.maskWeight;
        let left = offsetX - maskWeight/2;
        let top = offsetY - maskWeight/2;
        //得到遮罩元素
        let smallMove = this.$refs.small
        //判断边界
        if(left < 0){
          left = 0;
        }else if(left > maskWeight){
          left = maskWeight;
        }
        if(top < 0){
          top = 0;
        }else if(top > maskWeight){
          top = maskWeight;
        }
        //设置遮罩的位置
        smallMove.style.left = left + 'px';
        smallMove.style.top = top + 'px';
        //设置大图片的位置
        let bigImg = this.$refs.bigImg;
        bigImg.style.left = -left *2 + 'px';
        bigImg.style.top = -top *2 + 'px'
        
      },100)
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;

    img {
      width: 100%;
      height: 100%
    }

    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
    }

    .small {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #ccc;
      overflow: hidden;
      z-index: 998;
      display: none;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .mask:hover~.small,
    .mask:hover~.big {
      display: block;
    }
  }
</style>