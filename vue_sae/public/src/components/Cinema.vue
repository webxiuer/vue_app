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
      <!-- 影院信息 -->
      <div class="mycinema">
        <p class="cname">{{cinema.cname}}</p>
        <p class="price">¥{{cinema.cprice}}起</p>
        <p>{{cinema.caddress}}</p>
        <p>{{cinema.cphone}}</p>
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
      <div style="height:350px;">
        <!-- 影院加载提示 -->
        <mt-spinner v-if="!show" class="myspinner2" type="triple-bounce" :size=40></mt-spinner>
        <!-- 影院信息 -->
        <div class="cutting" v-if="show">
          <ul>
            <li v-for="(c,i) of cutting" :key="i">
              <div class="cut">
                <p class="room"><span>{{c.room}}号厅</span></p>
                <p class="time">时间 <span>{{c.time}}</span></p>
                <p class="cutprice">价格 <span>¥{{c.price}}</span></p>
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
        cid: "",
        mid: "",
        show: false, //
        active: "cinemas",
        movie: {}, //电影
        cinema: {}, //影院
        date: [], //购票日期
        cutting: [] //场次
      }
    },
    components: {
      "titlebar": TitleBar
    },
    props: {
      // from: ""
    },
    methods: {
      goBuy(i) {
        var date=document.querySelector(".actived").innerText;
        // console.log(date);
        // console.log(
        //     this.movie,
        //     this.cinema,
        //     this.cutting[i]);
        this.$router.push({
          name: 'seat',
          params: {
            movie: this.movie,
            cinema: this.cinema,
            date: date,
            cutting: this.cutting[i]
          }
        });
      },
      goBack() {
        this.$router.go(-1);
        // this.$router.back(1);
        // this.$router.push({name:'home'})
      },
      mysearch() {
        this.$toast("搜索"); //
      },
      doActive(pindex) { //切换日期项
        // 刷新场次
        var k=pindex*2+2;
        this.getCutting(k);
        // console.log(pindex);
        for (var i = 0; i < 3; i++) {
          var p = document.getElementById("p" + i);
          p.className = "myDateP";
        }
        var pa = document.getElementById("p" + pindex);
        pa.className = "myDateP actived";
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
      getCutting(k=2) {
        // 生成5个场次时间
        this.cutting = [];
        setTimeout(() => {
          for (var j = 0; j < 5; j++) {
            var newcut = new Date();
            newcut.setHours(newcut.getHours() + j + k);
            var cut = newcut.format("hh:mm");
            // console.log(cut);
            var obj = {
              room: j + 1,
              time: cut,
              price: this.cinema.cprice + this.cinema.cid * k
            };
            this.cutting.push(obj);
          }
        }, 300);
        // console.log(this.cutting);
        // console.log(this.cinema);
      },
      loadMovie() {
        var mid = this.$route.params.mid;
        this.mid=mid;
        // console.log(mid);
        // var url = `/api/movie/subject/${mid}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
        var url = '/api/detail?mid='+mid;
        this.axios.get(url).then(result => { //发送请求
          // console.log(result);
          this.movie = result.data;
          // 请求影院
          this.loadCinemas();
        });
      },
      loadCinemas() { //请求影院
        this.cinemas = []; //先清空
        var cid=this.$route.params.cid;
        var url = `https://triangle.applinzi.com/cinema`;
        // var url = `/cinema`;
        this.axios.get(url).then(result => {
          this.cinema = result.data.data[cid]; //取对应的影院
          this.getDate(); //获取日期
          this.getCutting();
          // 显示
          this.show = true;
        });
        // console.log("cinemas");
      }
    },
    created() {
      // this.cinema = this.$route.params.cinema; //影院
      // this.movie = this.$route.params.movie; //电影
      this.loadMovie(); //获取电影
      // this.getDate(); //获取日期
      // this.getCutting();
    },
    activated(){
      // this.cinema = this.$route.params.cinema; //影院
      // this.movie = this.$route.params.movie; //电影
      // this.getDate(); //获取日期
      // this.getCutting();
      // this.show = true;
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

  /* 影院信息 */
  .mycinema {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    height: 115px;
    /* text-align: left; */
  }

  .mycinema p {
    margin: 5px auto;
    /* text-align: left; */
    padding-left: 2px;
    font-size: 12px;
    width: 350px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mycinema p.cname {
    color: #000;
    font-size: 12px;
    font-weight: 700;
  }

  .mycinema p.price {
    color: rgb(167, 30, 30);
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

  /* 场次 */
  .cutting {
    width: 100%;
    height: 350px;
  }

  .cutting>ul {
    margin: 5px auto;
    padding: 2px;
    list-style: none;
    display: flex;
    flex-direction: column;
  }

  .cutting>ul>li {
    height: 60px;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #8e8e8e2a;
  }

  .cutting>ul>li .cut {
    width: 80%;
  }

  .cutting>ul>li .goBuy {
    height: 60px;
    width: 15%;
    line-height: 60px;
  }

  .cutting>ul>li .goBuy>img {
    width: 15px;
  }

  .cut {
    display: flex;
    justify-content: space-around;
  }

  .cut>p {
    margin: 0;
    width: 33%;
    height: 60px;
    line-height: 60px;
    font-size: 14px;
  }

  .cut .room span {
    font-size: 14px;
    font-weight: 700;
  }

  .cut .time span {
    font-size: 14px;
    color: orange;
  }

  .cut .cutprice span {
    font-size: 12px;
    font-weight: 700;
    color: orangered;
  }
</style>