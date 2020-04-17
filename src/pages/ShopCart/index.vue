<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cartItem,index) in cartList" :key="cartItem.skuId">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked ="cartItem.isChecked"
             @change = "setIsChecked(cartItem)">
          </li>
          <li class="cart-list-con2">
            <img :src="cartItem.imgUrl">
            <div class="item-msg">{{cartItem.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cartItem.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="getCartListNum(cartItem,-1)">-</a>
            <!-- 在vue组件模板中获取event事件用$event -->
            <input autocomplete="off" type="text"
             :value="cartItem.skuNum" minnum="1" class="itxt" @change="getCartListNum(cartItem, $event.target.value*1 - cartItem.skuNum)">
            <a href="javascript:void(0)" class="plus" @click="getCartListNum(cartItem,1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartItem.skuPrice*cartItem.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartItem(cartItem)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked = "isAllChecked && cartList.length>0" @change="setOrAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：￥ </em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade">结算</router-link>
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState , mapGetters } from 'vuex'
  export default {
    name: 'ShopCart',
    data(){
      return {
        sumPrice:'',
      }
    },
    mounted(){
      this.$store.dispatch('getCartList')
    },
    computed:{
      ...mapState({
        cartList: state => state.shopCat.cartList
      }),
      ... mapGetters(['totalNum','totalPrice','isAllChecked','deleteCheckedCart'])
    },
    methods:{
      //设置商品的选中状态
     async setIsChecked(cartItem){
        // 更改数据状态之后
       let isChecked = cartItem.isChecked === 1 ? 0 : 1
       let { skuId } = cartItem
       try{
          await this.$store.dispatch('getCheckCart',{skuId,isChecked})
          this.$store.dispatch('getCartList')
       }catch(error){
         alert(error.message)
       }
      },
      // 改变商品添加的数量
       async getCartListNum(cartItem,num){
        let { skuId , skuNum} = cartItem
        // console.log('num',num)
        if(skuNum + num > 0){
          try{
           //分发vuex中的getDeleteCart执行
           //在每次执行都在原来的基础上，添加指定数量该商品，所有上传应该商品目标数量加上差值
           //加上await是处理成功的结果，并且要等到addToCart执行完成之后，在触发getCartList
          await this.$store.dispatch('addToCart',{skuId,skuNum: num})
          this.$store.dispatch('getCartList')
         }catch(error){
         alert(error.message)
         }
        }
      },
      // 删除每一项商品
      async deleteCartItem(cartItem){
         let { skuId } = cartItem
         try{
           //分发vuex中的getDeleteCart执行
          await this.$store.dispatch('getDeleteCart',skuId)
          this.$store.dispatch('getCartList')
        }catch(error){
         alert(error.message)
       }
      },
      //删除选中的商品
      async deleteAllCart(){
         let { deleteCheckedCart } = this;
        //  判断一定是 === 0 而不是等于 0
         if(deleteCheckedCart.length === 0) return ;

         if(window.confirm('你确定要删除吗')){
            const promises = []
            //遍历选中的商品，进行删除操作
            deleteCheckedCart.forEach((item) => {
                let promise = this.$store.dispatch('getDeleteCart',item.skuId)
                promises.push(promise)
            })

             //所有的请求都成功之后，
            await Promise.all(promises).then(
              value => {
                  this.$store.dispatch('getCartList')
              },
              errror => {
                alert ( error.message )
              }
            )
         }
        
      },
      //全选全不选
      setOrAllChecked(event){
          // console.log(event)
          let isChecked = event.target.checked * 1;//得到的是文本形式
          const promises = []
          this.cartList.forEach((item) => {
           let promise = this.$store.dispatch('getCheckCart',{skuId:item.skuId,isChecked})
           promises.push(promise)
          })
          Promise.all(promises).then(
            value => {
              this.$store.dispatch('getCartList')
            },
            error => {
              alert(error.message)
            }
          )
        }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 4.1667%;
          }

          .cart-list-con2 {
            width: 25%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 12.5%;

          }

          .cart-list-con5 {
            width: 12.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>