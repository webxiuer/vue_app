<template>
  <div class="v_container">
    <!-- 顶部标题栏 -->
    <titlebar :leftTitle="active">
    </titlebar>
    <!-- 保留标题预留高度48px -->
    <div style="margin-top:48px;"></div>
    <div class="wrapper">
      <h3 class="title">{{movie.title}}</h3>
      <h5 class="title">{{date}} {{cutting.time}}</h5>
      <div class="cinema-wrapper">
        <div class="btn-wrapper">
          <div class="btn-buy" @click="buySeat">
            选定座位
          </div>
          <div class="btn-buy" @click="resetSeat">
            重置座位
          </div>
        </div>
        <div class="seat-wrapper">
          <div class="illustration">
            <div class="illustration-img-wrapper unselected-seat">
            </div>
            <span class="illustration-text">可选</span>
            <div class="illustration-img-wrapper selected-seat">
            </div>
            <span class="illustration-text">已选</span>
            <div class="illustration-img-wrapper bought-seat">
            </div>
            <span class="illustration-text">不可选</span>
          </div>
          <div class="screen">
            {{cutting.room}}号厅银幕
          </div>
          <div class="screen-center">
            银幕中央
            <div class="mid-line"></div>
          </div>
          <div class="inner-seat-wrapper" ref="innerSeatWrapper">
            <div v-for="(row,i) in seatRow" :key="i">
              <!--这里的v-if很重要，如果没有则会导致报错，因为seatArray初始状态为空-->
              <div class="seat" 
                v-for="(col,i) in seatCol" :key="i" 
                v-if="seatArray.length>0" 
                :style="{width:seatSize+'px',height:seatSize+'px'}">
                <div class="inner-seat" 
                  @click="handleChooseSeat(row-1,col-1)" 
                  v-if="seatArray[row-1][col-1]!==-1"
                  :class="seatArray[row-1][col-1]===2?'bought-seat':(seatArray[row-1][col-1]===1?'selected-seat':'unselected-seat')" 
                >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 选中的票 -->
    <mt-tabbar fixed class="myTAB">
      <div class="tik">
        <div class="tiks">
          <div v-for="(rows,i) of seatArray" :key="i">
            <div v-for="(cols,j) of rows" :key="j" 
             v-if="cols==1||cols==2" 
             class="atik"
            >{{i+1}}排{{j+1}}座</div>
          </div>
        </div>
        <div class="goBuy" @click="goBuy">
          <p>购票</p>
          <p>¥{{cutting.price*tiks}}</p>
          <img src="../assets/img/arr1.png">
        </div>
      </div>
    </mt-tabbar>
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

  export default {
    name: 'cinemaSeatChoose',
    data() {
      return {
        buys: [], //存放票据
        tiks: 0, //限制5张
        movie: {},
        cinema: {},
        date: "",
        cutting: {},
        active: "seat",
        //影院座位的二维数组,-1为非座位，0为未购座位，1为已选座位(绿色),2为已购座位(红色)
        seatArray: [],
        //影院座位行数
        seatRow: 10,
        //影院座位列数
        seatCol: 20,
        //座位尺寸
        seatSize: ''
      }
    },
    components: {
      "titlebar": TitleBar
    },
    computed: {},
    methods: {
      mysearch() {
        this.$toast("搜索"); //
      },
      goBack() {
        // this.$router.go(-1);
        this.$router.back(1);
        // this.$router.push({
        //   name: 'cinema',
        //   params: {
        //     movie: this.movie,
        //     cinema: this.cinema
        //   }
        // });
      },
      goBuy(){
        this.$toast({
          message: "添加到购票列表",
          duration: 300
        });
        // console.log("buy");
        var tis=document.querySelectorAll(".atik");
        // console.log(tis);
        for(var ti of tis){
          this.buys.push(ti.innerText);
        }
        // console.log(this.buys);
        // ----将票和电影影院场次的信息保存到一个对象
        var m=new Date().getMonth()+1;
        var d=new Date().getDate();
        var str=m+"月"+d+"日";
        var obj={
          buyTis: this.buys,
          cinema: this.cinema,
          cutting: this.cutting,
          movie: this.movie,
          buyDate: str
        }
        // console.log(obj);
        var jobj=JSON.stringify(obj);
        // 存储到vuex
        this.$store.commit("updateT",jobj); //在记录里取
        //--跳转
        setTimeout(()=>{
        this.$toast({
          message: "回到首页",
          duration: 500
        });
          this.$router.push({name:'home'}); //跳转去首页
          this.tiks=0;
        },500);
      },
      //重置座位
      resetSeat: function () {
        //将所有座位的值变为0
        let oldArray = this.seatArray.slice();
        for (let i = 0; i < this.seatRow; i++) {
          for (let j = 0; j < this.seatCol; j++) {
            if (oldArray[i][j] !== -1) {
              oldArray[i][j] = 0
            }
          }
        }
        this.seatArray = oldArray;
        // 清空tiks
        this.tiks=0;
      },
      //选定且购买座位
      buySeat: function () {
        //遍历seatArray，将值为1的座位变为2
        let oldArray = this.seatArray.slice();
        for (let i = 0; i < this.seatRow; i++) {
          for (let j = 0; j < this.seatCol; j++) {
            if (oldArray[i][j] === 1) {
              oldArray[i][j] = 2
            }
          }
        }
        this.seatArray = oldArray;
        // this.$toast("已清空购票栏");
      },
      //处理座位选择逻辑
      handleChooseSeat(row, col) {
        // console.log(this.tiks);
        // console.log(row+1, col+1); //坐标
        let seatValue = this.seatArray[row][col];
        let newArray = this.seatArray;
        //如果是已购座位，直接返回
        if (seatValue === 2) return;
        //如果是已选座位点击后变未选
        if (seatValue === 1) {
          newArray[row][col] = 0;
          this.tiks--; //
        } else if (seatValue === 0) { 
          if(this.tiks>=5){ //如果买了5张
            this.$toast("最多5张哦");
            // this.tiks++;
            return;
          }
          newArray[row][col] = 1;
          this.tiks++; //
        }
        // console.log(this.tiks);
        //必须整体更新二维数组，Vue无法检测到数组某一项更新,必须slice复制一个数组才行
        this.seatArray = newArray.slice();
        // console.log(this.seatArray); //
      },
      //初始座位数组
      initSeatArray: function () {
        let seatArray = 
        Array(this.seatRow).fill(0).map(
          () => Array(this.seatCol).fill(0));
        this.seatArray = seatArray;
        this.seatSize = 
        this.$refs.innerSeatWrapper ?
          parseInt(parseInt(window.getComputedStyle(this.$refs.innerSeatWrapper).width, 10) / this.seatCol, 10) :
          0;
        //初始化不是座位的地方
        this.initNonSeatPlace();
      },
      //初始化不是座位的地方
      initNonSeatPlace: function () {
        for (let i = 0; i < 9; i++) {
          this.seatArray[i][0] = -1;
        }
        for (let i = 0; i < 8; i++) {
          this.seatArray[i][this.seatArray[0].length - 1] = -1;
          this.seatArray[i][this.seatArray[0].length - 2] = -1;
        }
        for (let i = 0; i < 9; i++) {
          this.seatArray[i][this.seatArray[0].length - 3] = -1;
        }
        for (let i = 0; i < this.seatArray[0].length; i++) {
          this.seatArray[2][i] = -1;
        }
      }
    },
    created() {
      this.cinema = this.$route.params.cinema; //影院
      this.movie = this.$route.params.movie; //电影
      this.date=this.$route.params.date; //日期
      this.cutting=this.$route.params.cutting; //场次
      // console.log(this.$route.params);
    },
    mounted() {
      this.initSeatArray(10, 20);
    }
  }
</script>

<style scoped>
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
  /*票据显示+添加到购物车 */
  .myTAB{
    height: 50px;
    bottom: 40px !important;
    text-align: center;
  }

  .tik{
    display: flex;
    width: 100%;
  }
  .tik .tiks{
    width: 80%;
  }
  .tik .tiks{
    display: flex;
    justify-content: left;
  }
  .tik .tiks div{
    display: inline-block;
  }
  .atik{
    margin: 10px 2px;
    width: 55px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    box-sizing: border-box;
    border: 1px solid #8e8e8e2a;
    border-radius: 5px;
  }
  .tik .goBuy{
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    width: 20%;
    height: 50px;
    line-height: 50px;
  }
  .tik .goBuy>p{
    margin: 0;
    width: 50px;
  }
  .tik .goBuy img{
    width: 15px;
    height: 15px;
  }

  /* 选座xy图 */
  .wrapper {
    width: 100%;
    height: 100%;
    padding: 0px;
    box-sizing: border-box;
    overflow-x: scroll;
  }
  .title {
    margin: 5px 0px 0px 5px;
  }
  .cinema-wrapper {
    height: 100%;
  }

  .seat-wrapper {
    height: 700px;
    width: 1000px;
    /* width: 300%; */
    border: 1px dotted #c5c5c5;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  .screen {
    margin: 0 auto;
    height: 30px;
    width: 300px;
    background-color: #e3e3e3;
    border-radius: 0 0 30px 30px;
    color: #585858;
    line-height: 30px;
    text-align: center;
  }

  .inner-seat-wrapper {
    position: absolute;
    top: 120px;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
  }

  .seat {
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .inner-seat {
    width: 80%;
    height: 80%;
    cursor: pointer;
  }

  .selected-seat {
    background: url('./../assets/img/selected.png') center center no-repeat;
    background-size: 100% 100%;
  }

  .unselected-seat {
    background: url('./../assets/img/unselected.png') center center no-repeat;
    background-size: 100% 100%;
  }

  .bought-seat {
    background: url('./../assets/img/bought.png') center center no-repeat;
    background-size: 100% 100%;
  }

  .screen-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding: 5px;
    font-size: 13px;
    border-radius: 5px;
    top: 50px;
    background-color: #f6f6f6;
    color: #636363;
    border: 1px solid #b1b1b1;
  }

  .mid-line {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 100%;
    width: 1px;
    height: 800px;
    border-left: 1px dashed #919191;
  }

  .btn-wrapper {
    margin: 10px auto;
    width: 1000px;
    height: 30px;
    text-align: center;
  }

  .btn-buy {
    height: 100%;
    line-height: 30px;
    font-size: 14px;
    border-radius: 5px;
    padding: 0 5px;
    background-color: #ffa349;
    color: #ffffff;
    display: inline-block;
    cursor: pointer;
    margin-right: 10px;
  }

  .smart {
    background-color: #39ac6a;
  }

  .illustration {
    position: absolute;
    left: 0;
    top: 0;
    height: 35px;
    width: 300px;
  }

  .illustration-img-wrapper {
    width: 25px;
    height: 25px;
    position: relative;
    top: 50%;
    display: inline-block;
    transform: translateY(-50%);
    margin-left: 10px;
  }

  .illustration-text {
    display: inline-block;
    height: 100%;
    line-height: 35px;
    font-size: 14px;
    position: relative;
    top: -2px;
  }
</style>