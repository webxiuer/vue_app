<!-- Login.vue -->
<template>
  <div>
    <div v-if="show" class="hello">
      <div class="avatar">
        <img src="../assets/img/avatar.jpg">
      </div>
      <div class="msg">
        <h3>hello ,{{uname}}</h3>
        <p>Embrace the glorious mess that you are.</p>
        <p>Whatever your past has been, you have a spotless future.</p>
        <p>Life is a load of running, it is necessary to constantly in each choose a fork in the road.</p>
      </div>
    </div>
    <div v-if="!show">
      <!-- 输入域 -->
      <h3 style="padding-left:10px;">Login</h3>
      <div class="login_container">
        <!-- 用户名 -->
        <mt-field label="用户名" :placeholder="unameHolder" :attr="{maxlength:12}" v-model="uname" class="myinput"
          @blur.native.capture="inputLogin1">
          <!-- blur事件.capture -->
        </mt-field>
        <!-- 密码 -->
        <mt-field type="password" label="密码" :placeholder="upwdHolder" :attr="{maxlength:16}" v-model="upwd"
          class="myinput" @blur.native.capture="inputLogin2">
          <!-- blur事件.capture -->
        </mt-field>
        <!-- 提交按钮 -->
        <mt-button size="large" class="my_btn" @click.prevent="btnLogin">登录</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
  import qs from 'qs';
  export default {
    data() { //数据
      return {
        show: false,
        // show: true,
        uname: "watalidaoli", //设置默认
        upwd: "123456", //设置默认
        unameHolder: "请输入用户名",
        upwdHolder: "请输入密码"
      }
    },
    methods: { //事件处理函数
      inputLogin1() {
        if (this.uname.trim() == "") {
          this.$toast("用户名不能为空");
          return; //结束
        }
      },
      inputLogin2() {
        if (this.upwd.trim() == "") {
          this.$toast("密码不能为空");
          return; //结束
        }
      },
      btnLogin() {
        //获取到用户名和密码准备验证
        var u = this.uname;
        var p = this.upwd;
        //--简写 g影响二次验证
        var reg_uname = /^\w{3,12}$/i; //new RegExp("正则","ig")
        var reg_upwd = /^\w{6,16}$/i; //new RegExp("正则","ig")
        /* u+p */
        if (u.trim() == "" || p.trim() == "") {
          this.$toast("用户名或密码不能为空");
          return; //结束
        }
        if (!reg_uname.test(u)) {
          this.$toast("用户名为3~12位字母数字下划线!");
          return; //结束
        }
        if (!reg_upwd.test(p)) {
          this.$toast("密码为6~16位字母数字下划线!");
          return; //结束
        }
        //以上验证通过发送ajax
        /* ajax */
        // var url = "/login";
        var url = "https://triangle.applinzi.com/login";
        var data = qs.stringify({
          //参数1:值1, ...
          uname: u, //
          upwd: p //
        })
        this.axios.post(url, data).then(result => { //
          //获得服务端返回的结果
          // console.log(data);
          var res = result.data;
          // console.log(res);
          if (res.code > 0) {
            this.$toast("登录成功");
            setTimeout(()=>{
              this.show=true;
            },500);
            //跳转Home.vue
            // this.$router.push("/home"); //可以回退
          } else {
            this.$toast("用户名或密码有误"); //
            this.show=false;
          }
        });
      }
    }
  }
</script>
<style scoped>
  /* 样式 */
  .login_container {
    padding-top: 40px;
    background-color: #8e8e8e07;
  }

  .mint-field {
    border: 1px solid rgba(152, 26, 26, 0.068) !important;
    border-radius: 5px;
  }

  .my_btn {
    color: rgb(70, 14, 14);
    font-weight: 700;
    border: 1px solid rgba(152, 26, 26, 0.068) !important;
  }
  /* 欢迎界面 */
  .hello{
    margin-top: 20px;
    text-align: center;
  }
  .hello .avatar{
    margin: 10px auto;
  }
  .hello .avatar>img{
    width: 200px;
    border-radius: 15px;
  }
  .hello .msg>h3{
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
  }
  .hello .msg>p{
    padding: 0 10px;
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
  }
</style>