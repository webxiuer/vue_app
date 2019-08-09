/*====router.js 引入路由====*/
import Vue from 'vue';
import Router from 'vue-router';
/* 自定义组件 */
// 404
import NotFound from "./components/NotFound.vue";
//Home下
import Home from "./components/Home.vue";
import Login from "./components/Login";
import Cart from "./components/Cart.vue";
import Detail from "./components/Detail.vue";
import MovieList from "./components/MovieList.vue"
import Cinema from "./components/Cinema.vue";
import Seat from "./components/Seat.vue";

Vue.use(Router);
//2.配置Exam01...的路径
export default new Router({
  // base: '', 
  mode: 'history', //去#
  routes: [{
      path: '/',
      component: Home,
      meta: { //保存状态
        keepAlive: true
      }
    },
    /* Home */
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { //保存状态
        keepAlive: true
      }
    },
    /* MovieList */
    {
      path: '/movieList',
      name: 'movieList',
      component: MovieList,
      meta: { //保存状态
        keepAlive: true
      }
    },
    /* 详情 */
    {
      path: '/detail/:mid',
      name: 'detail',
      component: Detail,
      meta: { //保存状态
        // keepAlive: true
      }
    },
    /* 影院 */
    {
      path: '/cinema/:mid/:cid',
      name: 'cinema',
      component: Cinema,
      meta: { //保存状态
        // keepAlive: true
      }
    },
    /* 选座 */
    {
      path: '/seat/:movie/:cinema/:date/:cutting',
      name: 'seat',
      component: Seat
    },
    /* Login */
    {
      path: '/login',
      component: Login
    }, //登录窗口
    /* Cart */
    {
      path: '/cart',
      component: Cart
    }, //购票
    {
      path: '*',
      component: NotFound
    } //404
  ]
});