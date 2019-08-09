<template>
  <div class="parent">
    <!-- 子组件 MessageList.vue -->
    <!-- 图片路径需要是服务器端才可动态生成 -->
    <!-- <ul v-infinite-scroll="loadMore" 
      infinite-scroll-disabled="loading" 
      infinite-scroll-distance="10" 
      class="scrollList"> -->
    <ul class="scrollList">
      <mt-spinner v-if="list.length==0" type="triple-bounce" class="myspinner" color="rgb(122,26,26)" :size=40>
      </mt-spinner>
      <li v-for="(item,i) of list" :key="i" style="height:180px;">
        <movieitem :movieid="item.id" :imgurl="item.images.large" :title="item.title" :casts="item.casts"
          :directors="item.directors[0]" :rank="item.rating.average" :date="item.pubdates[0]" :itemClick="itemClick"
          class="itemstyle">
        </movieitem>
      </li>
      <li v-if="list.length!=0" class="msg">
        <h3>更多电影，敬请期待...</h3>
      </li>
    </ul>
    <!-- <mt-popup 
      :visible.sync="popupVisible" 
      position="bottom" 
      popup-transition="popup-fade" name="暂无更多">
    </mt-popup> -->
  </div>
</template>
<script>
  //1.引入子组件:
  import MovieItem from './MovieItem.vue';

  /* export */
  export default {
    data() { //data数据
      return {
        showMsg: true, //
        // popupVisible: false,
        // loading: false, //
        list: [], //电影数据
        // max: 11, //上限
        pno: 0, //起始
        count: 10 //一次请求10个
      }
    },
    //2.注册子组件:
    components: {
      "movieitem": MovieItem //标签名:组件名
    },
    methods: {
      itemClick(mid) { //去详情页
        this.$toast({
          message: "正在前往详情...",
          duration: 500
        }); //
        // console.log(mid);
        setTimeout(() => {
          this.$router.push({
            name: 'detail',
            params: {
              mid: mid
            }
          });
        }, 300)
      },
      loadMovies() {
        // this.count = 50;
        // var url =
        //   `/api/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${this.pno}&count=${this.count}`;
        var url='/api/movies50';
        this.axios.get(url).then(result => { //发送请求
          this.max = result.data.total; //
          // this.list = this.list.concat(result.data.subjects);
          this.list = result.data.subjects;
          // console.log(this.list.length); //50
          // this.pno += 10;
          this.loading = false;
        });
      },
    },
    created() {
      this.loadMovies(); //加载完就调用一次发送请求
    },
  }
</script>
<style scoped>
  body {
    margin: 0 !important;
  }

  /* 消息组件外观 */
  .itemstyle {
    border-bottom: 1px solid #d9d9d9;
  }

  .scrollList {
    /* height: 600px; */
    /* height: 100%; */
    /*与屏幕一样高度*/
    /* overflow-y: auto; */
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .msg {
    height: 50px;
    text-align: center;
    color: rgba(122, 26, 26, 0.8);
  }

  .msg>h3 {
    font-size: 17px;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
  }

  .myspinner {
    height: 450px;
    line-height: 450px;
    text-align: center;
  }
</style>