import Vue from 'vue'; //
import App from './App.vue'; //
import router from './router'; //
/*以上三行顺序不要调整*/

//第三方组件库: 
/*=============配置mint-ui库区域============*/
/* 1.引入mint-ui库文件 */
import MintUI from 'mint-ui';
/* 2.引入mint-ui样式文件 */
import 'mint-ui/lib/style.css';
/* 3.将mint-ui注册到vue实例中 */
Vue.use(MintUI);
/*=============配置mint-ui库区域============*/

/* 4.引入图标字体文件的css */
import './font/iconfont.css';

/* 5.引入axios.js */
import axios from './axios';

/* ========Vuex======== */
/* 6.引入vuex */
import Vuex from 'vuex';
/* 7.注册vuex组件 */
Vue.use(Vuex);
/* 8.创建store */
//store实例
var store=new Vuex.Store({
  state:{ 
    tickets: []
  }, //vuex全局共享的数据
  mutations:{ //修改
    updateT(state,val){ //一次增加指定值c
      state.tickets.push(val);
      // console.log(val);
    }
  },
  getters:{ //获取
    getT(state){ //获取共享数据
      return state.tickets;
    }
  }
});
/* 9.将store保存到vue实例中 */
//见new Vue

//============================
/*vue配置*/
Vue.config.productionTip = false; //
/*new Vue*/
new Vue({
  router,
  render: h => h(App),
  store //将store添加到vue实例
}).$mount('#app'); //
