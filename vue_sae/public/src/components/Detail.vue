<template>
  <div class="v_container">
    <!-- 顶部标题栏 -->
    <titlebar :leftTitle="active">
    </titlebar>
    <!-- 保留标题预留高度48px -->
    <div style="margin-top:48px;"></div>
    <!-- 内容区域 -->
    <mt-spinner v-if="!show" type="triple-bounce" class="myspinner" color="rgb(122,26,26)" :size=40></mt-spinner>
    <div class="myDetail" v-if="show">
      <div class="myBG" :style="{backgroundImage:'url('+movie.images.large+')'}">
        <div class="myIMG"><img :src="movie.images.small"></div>
        <div class="details">
          <h3>{{movie.title}}</h3>
          <h4>{{movie.original_title}}</h4>
          <p class="myRANK">{{movie.rating.average.toFixed(1)}}</p>
          <p class="myTAG">
            <span v-for="(p,i) of movie.tags" :key="i">{{p}} </span>
          </p>
          <p>{{movie.countries[0]}} / {{movie.durations[0]}}</p>
          <p>{{movie.pubdate}} 上映</p>
        </div>
        <div id="mask"></div>
      </div>
      <div class="info">
        <div class="mySUM" id="SUM">{{movie.summary}}</div>
        <div id="UD1" v-if="changeSUM_msg=='UD1'" @click="changeSUM($event)">
          <img src="../assets/img/down.png">
        </div>
        <div id="UD2" v-if="changeSUM_msg=='UD2'" @click="changeSUM($event)">
          <img src="../assets/img/up.png">
        </div>
      </div>
      <div class="P">
        <h5>演职人员</h5>
        <ul class="person">
          <li>
            <img :src="movie.directors[0].avatars.small">
            <p class="myP">导演:<br>
              <span>{{movie.directors[0].name}}</span>
            </p>
          </li>
          <li v-for="(p,i) of movie.casts" :key="i">
            <!-- 有几张头像图片豆瓣有误 -->
            <img :src="p.avatars.small">
            <p class="myP">主演:<br>
              <span>{{p.name}}</span>
            </p>
          </li>
        </ul>
      </div>
      <!-- 日期 -->
      <div class="date">
        <ul>
          <li v-for="(li,i) of date" :key="i">
            <p class="myDateP actived" v-if="i==0" :id="'p'+i" @click="doActive(i)">{{li}}</p>
            <p class="myDateP" v-if="i!=0" :id="'p'+i" @click="doActive(i)">{{li}}</p>
          </li>
        </ul>
      </div>
      <div style="height:648px;">
        <!-- 影院加载提示 -->
        <mt-spinner v-if="cinemas.length==0" class="myspinner2" type="triple-bounce" :size=40></mt-spinner>
        <!-- 影院 -->
        <div class="cinemas" v-if="cinemas.length!=0">
          <ul>
            <li v-for="(c,i) of cinemas" :key="i">
              <div class="cs">
                <div class="cinema">
                  <p class="cname">{{c.cname}}</p>
                  <p class="price">¥{{c.cprice}}起</p>
                </div>
                <div class="addr">
                  <p>{{c.caddress}}</p>
                  <p>{{c.cphone}}</p>
                </div>
              </div>
              <div class="goBuy" @click="goBuy(i)">
                <img src="../assets/img/arr1.png">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <mt-tabbar v-model="active" fixed>
      <mt-tab-item id="detail">
        <p class="btn" @click="goBack">返回上一级</p>
        <!-- <mt-button>返回</mt-button> -->
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
  //--引入子组件: 顶部标题
  import TitleBar from './TitleBar.vue';

  /* export */
  export default {
    data() { //data数据
      return {
        mid: "",
        changeSUM_msg: 'UD1',
        show: false, //
        active: "detail",
        movie: {}, //电影
        cinemas: [], //影院
        date: [] //购票日期
      }
    },
    components: {
      "titlebar": TitleBar
    },
    props: {
      // from: ""
    },
    methods: {
      goBuy(cid) {
        // console.log(cid);
        this.$router.push({
          name: 'cinema',
          params: {
            // movie: this.movie,
            mid: this.mid,
            cid: cid
          }
        });
      },
      changeSUM(e) { //切换详细介绍
        // console.log(e.target);
        if (SUM.className == "mySUM") {
          SUM.className = "mySUMS";
          this.changeSUM_msg = "UD2";
        } else {
          SUM.className = "mySUM";
          this.changeSUM_msg = "UD1";
        }
      },
      goBack() {
        this.$router.go(-1);
        // this.$router.back(1);
        // this.$router.push({name:'home'})
      },
      mysearch() {
        this.$toast("搜索"); //
      },
      // 请求电影
      loadDetail() {
        var mid = this.$route.params.mid;
        this.mid=mid;
        // console.log(mid);
        // var url = `/api/movie/subject/${mid}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
        var url = '/api/detail?mid='+mid;
        this.axios.get(url).then(result => { //发送请求
          // console.log(result);
          this.movie = result.data;
          this.show = true; //显示内容
        });
      },
      // 请求影院
      loadCinemas() {
        this.cinemas = []; //先清空
        var url = `https://triangle.applinzi.com/cinema`;
        // var url = `/cinema`;
        this.axios.get(url).then(result => {
          // console.log(result);
          this.cinemas = result.data.data;
        });
        // console.log("cinemas");
      },
      // 时间项
      getDate() {
        // 扩展日期函数
        Date.prototype.format = function (fmt) {
          var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (
              ("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
        }
        // 设置三天时间
        for (var i = 0; i < 3; i++) {
          var tomo = new Date();
          tomo.setDate(tomo.getDate() + i);
          var t = tomo.format("MM月dd日");
          // console.log(t);
          this.date.push(t);
        }
      },
      doActive(pindex) { //切换日期项
        this.loadCinemas();
        // console.log(pindex);
        for (var i = 0; i < 3; i++) {
          var p = document.getElementById("p" + i);
          p.className = "myDateP";
        }
        var pa = document.getElementById("p" + pindex);
        pa.className = "myDateP actived";
      },
      goML() {
        // this.$router.push({path: '/list'});
        this.$emit('goML', "movieList");
      }
    },
    created() {
      this.loadDetail(); //加载完就调用一次发送请求
      this.loadCinemas(); //加载影院
      this.getDate(); //生成时间项
    }
  }
</script>
<style scoped>
  body {
    margin: 0 !important;
    background-color: #8e8e8e !important;
  }

  /* 容器 */
  .v_container {
    overflow: hidden;
  }

  .mint-tab-item {
    padding: 0 !important;
  }

  .btn {
    color: #fff;
    background: rgb(226, 79, 79);
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    margin: 0;
  }

  /* 加载提示 */
  .myspinner {
    height: 608px;
    line-height: 608px;
    text-align: center;
  }

  .myspinner2 {
    height: 50px;
    line-height: 50px;
    margin: 10px;
    text-align: center;
  }

  /* 详情 */
  .myDetail {
    text-align: center;
  }

  /* 背景遮罩层 */
  #mask {
    width: 100%;
    height: 200px;
    position: absolute;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.67;
    z-index: -1;
  }

  /* 背景图 */
  .myBG {
    display: flex;
    justify-content: space-around;
    position: relative;
    width: 100%;
    height: 200px;
    background-repeat: no-repeat;
    background-size: 400px 500px;
    background-position: center top;
    z-index: -1;
  }

  /* 图+文 */
  .myIMG {
    width: 40%;
    height: 200px;
  }

  .myIMG>img {
    width: 140px;
    height: 180px;
    margin: 10px 5px;
    border-radius: 2px;
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;
    width: 50%;
    height: 180px;
    color: #ddd;
    font-size: 12px;
    padding: 10px 0;
  }

  .details>h3 {
    margin: 0;
    color: rgba(226, 79, 79, 0.8);
  }

  .details>h4 {
    margin: 0;
    color: #8e8e8e;
    font-size: 12px;
    width: 180px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .details>p {
    margin: 0;
    font-size: 12px;
  }

  .details .myRANK {
    color: peru;
    font-size: 16px;
  }

  .details .myTAG {
    width: 120px;
    font-size: 12px;
    color: #aaa;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  /* 介绍 */
  .info {
    width: 100%;
    margin: 5px auto;
    background: #fff;
  }

  .info .mySUM {
    width: 95%;
    /* height: 80px; */
    text-align: left;
    line-height: 16px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    text-indent: 12px;
    letter-spacing: 1px;
    margin: 0 auto;
    /* overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3; */
    /* white-space: nowrap; */
    font-size: 12px;
    font-family: "宋体";
    /* transition: all 3s linear; */
    /* border-bottom: 1px solid #8e8e8e2a; */
    /* padding-bottom: 5px; */
  }

  .info .mySUMS {
    width: 95%;
    /* height: 80px; */
    text-align: left;
    line-height: 16px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    /* -webkit-line-clamp: 5; */
    overflow: hidden;
    text-indent: 12px;
    letter-spacing: 1px;
    margin: 0 auto;
    /* overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3; */
    /* white-space: nowrap; */
    font-size: 12px;
    font-family: "宋体";
    /* border-bottom: 1px solid #8e8e8e2a; */
    padding-bottom: 5px;
  }

  /* 按钮up down */
  #UD1,
  #UD2 {
    height: 20px;
    text-align: center;
  }

  #UD1>img,
  #UD2>img {
    height: 20px;
    margin: 0 auto;
  }

  /* 演职人员 */
  .P {
    width: 100%;
  }

  .P>h5 {
    margin: 2px auto;
  }

  .P .person {
    margin: 0;
    padding: 5px 0;
    list-style: none;
    display: flex;
    justify-content: center;
    /* 靠中 */
    border-top: 1px solid #8e8e8e2a;
    border-bottom: 1px solid #8e8e8e2a;
  }

  .P .person li {
    width: 70px;
    height: 120px;
    /* object-fit: contain; */
  }

  .P .person img {
    margin: 0 auto;
    width: 60px;
    height: 85px;
    border-radius: 2px;
    /* object-fit: contain; */
  }

  .P .person .myP {
    width: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 auto;
    font-size: 12px !important;
  }

  .P .person .myP>span {
    font-size: 12px !important;
  }

  /* date相关 */
  .date {
    width: 100%;
    margin: 0 auto;
    height: 30px;
    line-height: 30px;
    margin-bottom: 5px;
  }

  .date>ul {
    margin: 0;
    padding: 0;
    height: 30px;
    display: flex;
    justify-content: space-around;
    list-style: none;
  }

  .date>ul>li {
    width: 33.3%;
    height: 30px;
    box-sizing: border-box;
    border: 1px solid #8e8e8e2a;
    border-radius: 2px;
  }

  .date .myDateP {
    line-height: 30px;
    height: 30px;
    font-size: 12px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .date .myDateP.actived {
    border-bottom: 1px solid rgb(141, 20, 20);
  }

  /* 影院相关 */
  .cinemas {
    width: 100%;
    height: 608px;
  }

  .cinemas ul {
    padding: 0;
    display: flex;
    flex-direction: column;
    list-style: none;
    font-size: 12px;
    margin-bottom: 40px;
  }

  .cinemas ul>li {
    display: flex;
    justify-content: space-between;
    margin: 0;
    border-bottom: 1px solid #8e8e8e2a;
    margin-bottom: 5px;
  }

  .cinemas ul>li .goBuy {
    width: 15%;
    height: 70px;
    line-height: 70px;
  }

  .cinemas ul>li .goBuy img {
    width: 15px;
  }

  .cinemas ul>li .cs {
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 80%;
    margin: 0 auto;
    height: 70px;
  }

  .cinemas ul>li .addr p {
    margin: 2px 0;
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #888;
  }

  .cinemas .cinema {
    display: flex;
    justify-content: space-between;
  }

  .cinemas .cinema p {
    margin: 2px 0;
    font-weight: 700;
  }

  .cinemas .cinema p.cname {
    font-size: 14px;
  }

  .cinemas .cinema p.price {
    color: rgb(141, 20, 20);
  }
</style>