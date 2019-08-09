<template>
  <div class="page-head">
    <!-- 子组件 TitleBar.vue -->
    <!-- 左侧文字 -->
    <span v-if="leftTitle=='indexPage'" 
    class="mySpan">TRI</span>
    <span v-else-if="leftTitle=='movieList'" 
    class="mySpan">电影</span>
    <span v-else-if="leftTitle=='ticket'" 
    class="mySpan">历史</span>
    <span v-else-if="leftTitle=='me'" 
    class="mySpan">个人</span>
    <span v-else-if="leftTitle=='detail'" 
    class="mySpan">详情</span>
    <span v-else-if="leftTitle=='cinemas'" 
    class="mySpan">影院</span>
    <span v-else-if="leftTitle=='seat'" 
    class="mySpan">选座</span>
    <div class="right-head">
      <!-- <img :src="rightFirstImg" 
      @click="search"
      width="30px;" style="color:#fff"> -->
      <!-- <mt-search placeholder="搜索" width="180px;"></mt-search> -->
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        //
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1);
        console.log("回上一级");
      }
    },
    props: { //声明pros接收父组件数据
      leftTitle: {
        default: ""
      }
      // ,
      // rightFirstImg: {
      //   default: ""
      // },
      // search: {
      //   type: Function
      // }
    } //
  }
</script>
<style scoped>
	body {
		margin: 0 !important;
	}
  /* 最外层父元素 */
  .page-head {
    display: flex;
    /*弹性布局*/
    position: fixed;
    /*固定定位*/
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    justify-content: space-between;
    /*两端对齐*/
    align-items: center;
    /*垂直居中*/
    background: rgb(226, 79, 79);
    /* 微调 */
    padding-left: 7px;
    padding-right: 7px;
    height: 48px;
    color: #fff;
    font-size: 18px;
  }
  .mySpan{
    display: inline-block;
    text-align: center;
    width: 50px;
    height: 20px;
    line-height: 20px;
  }
  /* 右侧图片区域 */
  .right-head {
    /* display: flex; */
    padding-right: 15px;
  }
</style>