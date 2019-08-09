<template>
  <div>
    <!-- 面板1 -->
    <!-- 轮播 -->
    <div class="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item>
          <img src="../assets/img/s0.jpg" class="myPic">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../assets/img/s1.jpg" class="myPic">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../assets/img/s2.jpg" class="myPic">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../assets/img/s3.jpg" class="myPic">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 热门电影 -->
    <div>
      <div class="flex0">
        <h3 class="myH3">热门电影</h3>
        <h5 class="myArrow" @click="goML">更多&gt;&gt;</h5>
      </div>
      <div class="flex">
        <div class="hot" 
          v-for="(item,i) of movielist" :key="i"
          @click="goDetail(item.id)">
          <img :src="item.images.large">
          <p class="myP">{{item.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /* export */
  export default {
    data() { //data数据
      return {
        movielist: [] //电影数据
      }
    },
    methods: {
      // 请求电影
      loadMore() {
        var url = "/api/movies10";
        this.axios.get(url).then(result => { //发送请求
          // console.log(result);
          this.movielist = result.data.subjects;
          // console.log(this.movielist);
        });
      },
      goML(){
        // this.$router.push({path: '/list'});
        // 跳转的页面是movielist 传递给home
        this.$emit('goML',"movieList");
      },
      goDetail(mid){
        // this.$toast("正在前往详情..."); //
        this.$toast({
          message: '正在前往详情...',
          duration: 500
        });
        setTimeout(() => {
          this.$router.push({
            name: 'detail',
            params: {
              mid: mid
            }
          });
        }, 300)
      }
    },
    created() {
      this.loadMore(); //加载完就调用一次发送请求
    }
  }
</script>
<style scoped>
	body {
		margin: 0 !important;
	}
  /* 轮播 */
  .banner {
    width: 100%;
    height: 180px;
  }

  .banner .myPic {
    width: 100%;
    height: 180px;
  }

  /* 热门电影 */
  .flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
  }
  .flex0{
    display: flex;
    justify-content: space-between;
  }
  .flex0 .myArrow{
    width: 55px;
    height: 25px;
    line-height: 25px;
    margin-right: 15px;
    color: rgb(119, 33, 33);
  }
  .myH3{
    padding: 0px 20px;
    color: #d81e06;
  }

  .hot {
    width: 48%;
    height: 260px;
    text-align: center;
    background: rgba(240, 128, 128, 0.068);
    margin-bottom: 10px;
  }

  .hot>img {
    width: 150px;
    height: 220px;
    margin: 5px auto;
    width: 150px;
  }
  .hot .myP{
    margin: 2px auto;
    color: #233;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>