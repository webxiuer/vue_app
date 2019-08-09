<template>
  <!-- Cart.vue -->
  <div class="v_container">
    <!-- 订票历史列表 -->
    <div v-if="Tmsg.length==0" class="myMsg">
      <h3>订票记录会显示在这哦</h3>
    </div>
    <div v-if="show" class="myHis">
      <div class="info" v-for="(item,i) of Tmsg" :key="i">
        <!-- 电影 -->
        <div class="movie">
          <div><img :src="item.movie.images.small"></div>
          <div class="title">{{item.movie.title}}</div>
        </div>
        <div class="others">
          <!-- 影院 -->
          <div class="cinema">{{item.cinema.cname}}</div>
          <!-- 场次 -->
          <div class="cutting">
            <p>{{item.cutting.room}}号厅</p>
            <p>场次 {{item.cutting.time}}</p>
          </div>
          <!-- 票 -->
          <div class="tiks">
            <div v-for="(ts,j) of item.buyTis" :key="j" class="atik">
              {{ts}}
            </div>
          </div>
          <!-- 价格 -->
          <div class="price">
            <span>¥{{item.cutting.price*item.buyTis.length}}</span>
          </div>
          <!-- 下单日期 -->
          <div class="date">
            <span>日期: {{item.buyDate}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        Tmsg: [], //
        show: false
      }
    },
    methods: {
      loadMore() { //loadMore
        // console.log("获取vuex");
        // console.log("tiks",this.$store.state.tickets);
        var msg = this.$store.getters.getT;
        // console.log(msg);
        var Tmsg = [];
        for (var m of msg) {
          var pm = JSON.parse(m);
          // console.log(pm);
          Tmsg=Tmsg.concat(pm);
        }
        this.Tmsg = Tmsg;
        // console.log(this.Tmsg);
        if (this.Tmsg != undefined) {
          this.show = true;
        } else {
          this.show = false;
        }
      }
    },
    created() { //创建时调用一次loadMore
      // this.loadMore();
    },
    updated() {
      // this.loadMore();
    },
    activated() { //激活路由时触发
      this.loadMore();
    },
    beforeRouteEnter() {
      // this.loadMore();
    }
  }
</script>
<style scoped>
  body {
    margin: 0 !important;
  }

  /* 容器 */
  .v_container {
    overflow: hidden;
  }

  .myMsg {
    width: 100%;
    text-align: center;
  }

  .myMsg h3 {
    margin: 150px auto;
    color: #4b1111;
  }

  .myHis {
    margin: 5px auto;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .myHis .info {
    width: 100%;
    height: 180px;
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid #8e8e8e2a;
  }

  .myHis .info .movie {
    width: 35%;
    height: 180px;
    text-align: center;
    padding-top: 5px;
  }

  .myHis .info .movie img {
    height: 140px;
    width: 90px;
    border-radius: 2px;
  }

  .myHis .info .movie .title {
    font-size: 14px;
    font-weight: 700;
    width: 120px;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .myHis .others{
    width: 60%;
    height: 180px;
  }
  .myHis .cinema{
    margin: 10px 0;
    font-size: 12px;
    font-weight: 700;
    text-align: left;
  }
  .myHis .cutting{
    margin: 10px 0;
    font-size: 12px;
    font-weight: 700;
    color: #555;
    display: flex;
    justify-content: start;
  }
  .myHis .cutting p{
    margin-right: 10px;
  }
  .myHis .tiks{
    display: flex;
    margin: 10px 0;
  }
  .myHis .atik{
    width: 50px;
    box-sizing: border-box;
    border: 1px solid #8e8e8e2a;
    font-size: 12px;
  }
  .myHis .price{
    width: 100px;
    height: 20px;
    margin-left: 140px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    color: orangered;
  }
  .myHis .date{
    margin: 10px 0;
    font-size: 12px;
    font-weight: 700;
    width: 120px;
    height: 20px;
    margin-left: 140px;
    line-height: 20px;
    text-align: center;
    color: #233;
  }
  .myHis .date span{
    display: inline-block;
    margin-right: 20px;
  }
</style>
