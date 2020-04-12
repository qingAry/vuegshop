<template>
  <div class="type-nav">
    <div class="container">
      <!-- 为了实现只经过全部商品分类产生效果 可以添加div -->
      <div  @mouseenter="isHidden = true" @mouseleave="isHiddenFirst">
      <h2 class="all">全部商品分类</h2>
      
      <!-- 只绑定一个事件，在父元素身上 -->
      <div class="sort"  @mouseleave = "currentIndex = -1"
       @click="getSearch" v-if="isHidden">
        <div class="all-sort-list2">
          <!-- index中的用的值和循环中的值相等 -->
          <!-- 列表快速花东的时候，不是目标列表不需要显示 -->
          <div class="item" :class = "{ 'item_on':currentIndex === index}" v-for="(b1,index) in baseCategoryList"
           :key="b1.categoryId" @mouseenter="getcurrentIndex(index)">
           <!-- @mouseenter="currentIndex = index" -->
            <h3>
              <!-- 自定义标签属性携带数据 -->
               <a href="javascript:;"
               :data-categoryName = "b1.categoryName" :data-category1Id = "b1.categoryId">{{b1.categoryName}}</a>
               <!-- to后面如果用的是对象形式，需要用动态的效果获取数据 -->
              <!-- <router-link
              :to="{path:'/search',query:{ categoryName : b1.categoryName , category1Id : b1.categoryId}}">
              {{b1.categoryName}}</router-link> -->
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <dl class="fore" v-for="(b2,index) in b1.categoryChild" :key="b2.categoryId">
                  <dt>
                    <a href="javascript:;"
                    :data-categoryName = "b2.categoryName" :data-category2Id = "b2.categoryId">
                    {{b2.categoryName}}</a>
                    <!-- <router-link
              :to="{path:'/search',query:{ categoryName : b2.categoryName , category2Id : b2.categoryId}}">
              {{b2.categoryName}}</router-link> -->
                  </dt>
                  <dd>
                    <em v-for="(b3,index) in b2.categoryChild" :key="b3.categoryId">
                      <a href="javascript:;"
                      :data-categoryName = "b3.categoryName" :data-category3Id = "b3.categoryId">
                      {{b3.categoryName}}</a>
                      <!-- <router-link
              :to="{path:'/search',query:{ categoryName : b3.categoryName , category3Id : b3.categoryId}}">
              {{b3.categoryName}}</router-link> -->
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      
      
      
      </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

//测试
// let json = {
// 			'a': '我是json自带的',
// 			...mapState({
//         baseCategoryList : state => state.home.baseCategoryList
//       })
// 			}
// console.log(json)
//全部引入
// import _ from 'lodash'
// 按需引入 减少打包文件的大小
import throttle from 'lodash/throttle'
  export default {
    name: 'TypeNav',
    data(){
      return {
        currentIndex:-1,
        isHidden:true,
      }
    },
    mounted(){
      //要在vue中分发事件之后，vuex才能起到作用，才能触发调用成功
      //每次点击都会发送请求 放在总的入口文件中，相同的请求只需要触发一次
      // this.$store.dispatch("getBaseCategoryList");
      //获取当前的路由路径
      let path = this.$route.path;
      if(path !== '/'){
        this.isHidden = false;
      }
    },
    computed:{
      //只有通过回调函数才能得到特定指定的数据
      //使用此方法的意思是，通过...mapState获取得到的对象混入到computed对象里面
      ...mapState({
        baseCategoryList : state => state.home.baseCategoryList
      })
      //解构之后得到
      /*{
        baseCategoryList : state.home.baseCategoryList
      }*/
    },
    methods:{
      // 函数节流：解决频繁操作，规定间隔时间触发事件
      // 必须要为函数，this指向的是
       getcurrentIndex : throttle( function (index){
        //  console.log(this.currentIndex)
         this.currentIndex = index;
       } , 300),
      // 此事件进入搜索页面
       getSearch(event){
          // 自定义标签携带动态数据
          let { categoryname , category1id , category2id, category3id } = event.target.dataset;
          //点击的标签为a的时候，发生调转
          if(categoryname){
            let query = { categoryName:categoryname };//给query对象赋值
             console.log('ddd')
            //给query对象中添加category1Id属性
            if(category1id){
              query.category1Id = category1id;
            }else if(category2id){
              query.category2Id = category2id;
            }else if(category3id){
              query.category3Id = category3id;
            }
            //push：动态的导航到一个新 URL
            let { path } = this.$route;
            // console.log( this.$route)
           if( path.indexOf('/search') === 0){
             //判断是否携带了search
             this.$router.push({path,query})
           }else{
             this.$router.push({path:'/search',query})
           }
          }
          
       },
       //除了首页没有移出隐藏
       isHiddenFirst(){
         //当前路由路径不为首页的时候
         if(this.$route.path !== '/'){
           this.isHidden = false;
         }
       }
    }
  }
</script>

<style lang="less"  scoped>
.type-nav {
        border-bottom: 2px solid #e1251b;
        
    }
.container{
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;
            .all{
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }
            .nav{
                a{
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }
            .sort{
                position: absolute;
                left:0;
                top:45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;
                .all-sort-list2{
                    .item{
                        h3{
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;
                            a{
                                color: #333;
                            }
                        }
                        .item-list{
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            _height: 200px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;
                            .subitem{
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;
                                dl{
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;
                                    &.fore{
                                        border-top: 0;
                                    }
                                    dt{
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }
                                    dd{
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;
                                        em{
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
                        &.item_on{
                            background-color: pink;
                            .item-list{
                                display:block;
                            }
                        }
                    }
                }
            }
        }
</style>