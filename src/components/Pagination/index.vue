<template>
  <!--分页组件-->
  <!-- 当商品界面有商品才显示页码 -->
  <div class="pagination" v-if="pageConfig.total>0">
    <!--上一页-->
    <button :disabled = " currentPage === 1 " @click = "setCurrentPage(currentPage -1)">上一页</button>
    <!-- 第1页 -->
    <!-- 开始的位置要大于1才能显示1 -->
    <button @click="setCurrentPage(1)" v-if=" getPage.start > 1">1</button>
    <!-- 省略号 -->
    <button disabled v-if="getPage.start > 2">···</button>
      <!-- 连续页码 -->
    <button v-for ="page in getPage.end" :key="page"
    v-if=" page >= getPage.start" :class = "{active:currentPage === page}"
    @click = "setCurrentPage(page)">
      {{page}}
    </button>

    <!-- 省略号 -->
    <button disabled v-if="getPage.end <= getTotalPage-2">···</button>
    <!-- 最后一页 -->
    <button @click = "setCurrentPage(getTotalPage)" v-if="getPage.end < getTotalPage">
      {{ getTotalPage }}</button>
    <!--下一页-->
    <button @click = "setCurrentPage(currentPage + 1)" :disabled =" currentPage === getTotalPage">下一页</button>
    <!-- 总记录数 -->
    <button disabled style="margin-left: 30px">共{{ pageConfig.total }}条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:{
       pageConfig: {
        type: Object,//当前config的类型
        // default: {
          default(){
            return {
              total: 0,  // 总记录数量
              pageSize: 5, // 一页最多显示多条记录
              pageNo: 1,// 当前在第几页
              showPageNo: 5, // 连续显示的页码数
            }
          }
          
        // }
      },
    },
    data(){   
      //data能获取props中的数据
      return {
        currentPage: this.pageConfig.pageNo   // 当前页码
      }
    },
    computed:{
      //获取总的页码数
      getTotalPage(){
        //console.log('this.pageConfig.pageNo',this.pageConfig.pageNo)
        const {total, pageSize} = this.pageConfig
        if (total <= 0 || pageSize <= 0) return 0
        return Math.ceil( total / pageSize )
      },
      //得到小圆点开始的位置和结束的位置
      getPage(PageIndex){
         // 获取当前的属性
         let currentPage = this.currentPage;
         // 连续显示的页码数

        let { showPageNo } = this.pageConfig;

        //  //初始开始位置/结束位置
        //  let start = 0;
        //  let end = 0;
         
         //正常情况下start的开始位置
         let start = currentPage - Math.floor(showPageNo/2);
         let end = currentPage +  Math.floor(showPageNo/2);
         if(start < 1){
           start = 1
           //结束页码
           end = start +  Math.floor(showPageNo/2)*2;
         }
         
         //如果结束的小圆点结束的位置，比最后的位置小于2的时候，
         //start对应的是同一个页码数
         if(end > this.getTotalPage-2){
           end = this.getTotalPage
           start = end - Math.floor(showPageNo/2)*2;
           // 如果start小于1, 指定为1
            if (start<1) {
              start = 1
            }
         }
         
         return { start , end }
      }
    },
      methods:{
      // 响应当前页码，更新商品界面
      setCurrentPage(page) {
        this.currentPage = page;
        this.$emit('changeCurrentPage',page)
      }
    },
    watch:{
      //监视当前页面发生改变的时
      'pageConfig.pageNo' (value) {
        this.currentPage = value
      }
    },
    created () { // created()在data()之后执行
      console.log('created()', this.currentPage) // 有值
    }

  }
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline:none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>