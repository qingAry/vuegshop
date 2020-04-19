<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="options.categoryName">
              {{options.categoryName}}
              <i @click="removeCategory">×</i>
            </li>
            <li class="with-x" v-if="options.keyword">
              {{options.keyword}}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 搜索结果：品牌名称 -->
            <li class="with-x" v-if="options.trademark">
              {{options.trademark.split(':')[1]}}
              <i @click="removeTrademark">×</i>
            </li>
            <!-- 需要遍历的是一个数组 -->
            <li class="with-x" v-for="(prop,index) in options.props" :key="prop" v-if="prop">
              {{prop}}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector :setTrademark = "setTrademark" :addProps = 'addProps'/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isActive('1')}" @click = "setOrder('1')">
                  <a href="#">
                    <!-- 升/降序图标 -->
                    综合{{getOrderIcon('1')}} 
                  </a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li :class="{active:isActive('2')}"  @click = "setOrder('2')">
                  <a href="javascript:;">
                    <!-- 升/降序图标 -->
                    价格{{getOrderIcon('2')}}
                  </a>
                </li>
                <!-- <li>
                  <a href="#">价格⬇</a>
                </li> -->
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good,index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to = "`/detail/${good.id}`">
                    <!-- <router-link to = "{name:'/detail',params:{mid:good.id}}"> -->
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                    <!-- <a href="javascript:;" target="_blank">
                      <img :src="good.defaultImg" />
                    </a> -->
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{good.price}}.00 </i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to = "{name:'/detail',params:{mid:good.id}}">
                    {{good.title}}
                    </router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <!-- <router-link to="/addcartsuccess" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</router-link> -->
                    <a href="javascript:;"
                     class="sui-btn btn-bordered btn-danger" @click="addTocart(good)">加入购物车</a>
                    <a href="javascript:;" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>  
            </ul>
          </div>
          <div class="fr page">
            <Pagination :pageConfig="{
              total: productList.total, //总的页数
              showPageNo : 5,//展示页数，来看多远能出现小圆点
              pageNo : options.pageNo, //当前的显示页数
              pageSize : options.pageSize, //一页显示几张
              }" @changeCurrentPage = "changeCurrentPage"/>
            <!-- }" @changeCurrentPage = "changeCurrentPage"/> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import { mapGetters , mapState } from 'vuex'
 import SearchSelector from './SearchSelector/SearchSelector'
 
  export default {
    name: 'Search',
    data(){
      return {
        // 请求条件的数据 带着条件向后台发送post请求
        //post请求到底和后台是怎么交互的呢？？？？
        //不是给后台数据吗？怎么能根据这些条件显示了特定的内容呢
        options:{
          category1Id:'', //一级分类ID
          category2Id:'',//二级分类ID
          category3Id:'',//三级分类ID
          categoryName:'',//分类名称
          keyword:'', //搜索关键字
          trademark:'', //品牌ID:品牌名称
          order:'1:desc',  //排序方式  综合1,价格2 升序asc,降序desc"2:desc"
          pageNo:1,   //当前第几页
          pageSize:5,   //每页最多显示多少条数据	
          props:[]
        }
      }
    },
    mounted(){
      //当前请求的路由：获取参数
      const { query,params } = this.$route
      // console.log(this.$route)
      //获取当前options中变化的路由的参数
      const options = {
        ...this.options,
        ...query,
        ...params
      }
      //更新options
      this.options = options;
      // 触发界面更新
      this.setProductList()
    },
    components: {
      SearchSelector
    },
    computed:{
      ...mapGetters(['goodsList']),
      ...mapState({
        productList : state =>  state.search.productList 
      })
    },
   watch:{
     //当路由发生改变，调用此内容
     //点击搜索的categoryName 和 搜索框搜索的关键词 都能够在全部结果显示
     '$route' (to,from) {
       //to是代表当前的路由对象
      let { query,params } = to;
      const options = {
        ...this.options,
        //重置数据，防止有的id没能消除/
        category1Id:'', //一级分类ID
        category2Id:'',//二级分类ID
        category3Id:'',//三级分类ID
        ...query,
        ...params
      }
      //更新options
      this.options = options;
      this.setProductList()
     }
   },
   methods:{
     // 加入购物车
    async addTocart(good){
        let tmId = good.id
        let result = await this.$store.dispatch('addToCart',{skuId:tmId, skuNum:1})       
        if(!result){
          window.sessionStorage.setItem('ADD_CART_KEY', JSON.stringify(good))
          // this.$router.push('/addcartsuccess')
          this.$router.push({path:'/addcartsuccess',query:{skuId:tmId, skuNum:1}})
        }else{
          alert("result.message")
        }
      },
     //移出列表的名称（路由的query参数）
     removeCategory(){
       this.options.category1Id = '', //一级分类ID
       this.options.category2Id = '', //二级分类ID
       this.options.category3Id = '', //三级分类ID
       this.options.categoryName = '',//分类名称
      //  this.setProductList()
       //console.log(this.$route.path)
       //重新给当前路由赋值
       this.$router.replace(this.$route.path)
     },
     //移出搜索关键字
    removeKeyword(){
      this.options.keyword = '',
      // this.setProductList()
      //全局事件总线 去除搜索框内容
      this.$bus.$emit('removeKeyword')
      this.$router.replace({path:'/search',query:this.$route.query})
    },
    // 移出品牌名称
    removeTrademark(){
      this.options.trademark = '';
      this.setProductList()
    },
    removeProp(index){
      this.options.props[index] = '';
      this.setProductList()
    },
    setProductList( page = 1 ){
      // 每次获取新的请求列表时，就将pageNo重置为1，每次默认就显示1
      this.options.pageNo = page   
      let options = this.options;
      // console.log(options)
      //去除请求参数为空的数据
      Object.keys(options).forEach((key) => {
        if(options[key] === ''){
          delete options[key]
        }
      })
      //console.log(this.options.pageNo)
      this.$store.dispatch('getProductList',this.options)          
    },
    setTrademark(tmId,tmName){
        //获取品牌的信息
        this.options.trademark = tmId + ':' + tmName;
        this.setProductList()
    },
    //添加商品属性
    addProps(attrId,valueList,attrName){
        let value = `${attrId}:${valueList}:${attrName}`
        //防止发送多余的请求
        if(this.options.props.indexOf(value) !== -1) return;
        //给商品属性数组添加新数据
        this.options.props.push(value)
        //更新商品属性
        this.setProductList()
    },
    // 判断颜色
    isActive( changeId ){
       return this.options.order.indexOf( changeId ) === 0
    },
    //设置排序方式
    setOrder( changeId ){
      // 解构当前排序sort的数组
       let [ currentId,sortord ] = this.options.order.split(':');
      //  console.log(currentType,type)
      //  console.log(sortType)
       //如果请求的和当前显示的是同一个名称的话，直接改变排序方式
       if( changeId === currentId){
         sortord = sortord === 'desc' ? 'asc' : 'desc'
       }else{
         //指定id为当前点击的id
         currentId = changeId;
         sortord = 'desc'
       }
       this.options.order = `${currentId}:${sortord}`
       //重新获取数据 列表的排序
       this.setProductList()
    },
    //升/降序图标
    getOrderIcon( changeId ){
      let [ currentId,sortord ] = this.options.order.split(":");
      let orderIcon 
      //判断点击是否是当前升降序排列，如果是,就改变当前图标的方向，如果不是就不显示图标
      if( changeId === currentId ) {
        orderIcon = sortord === 'desc' ? '⬇' : '⬆'
      }else{
        orderIcon = '';
      }
      //返回图标
      return orderIcon
    },
    //页码发生改变
    changeCurrentPage(page){
      // this.options.pageNo = page;
      //更新页数界面
      this.setProductList(page)
    }
     
   }

  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>