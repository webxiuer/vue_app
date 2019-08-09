<template>
	<div class="v_container">
		<div class="page-wrap">
			<!-- weixin Home.vue -->
			<!-- 顶部标题栏 -->
			<titlebar :leftTitle="active">
			</titlebar>
			<!-- 防止顶部溢出 -->
			<!-- 保留标题预留高度48px -->
			<div style="margin-top:48px;"></div>
			<!-- ============================= -->
			<!-- 1. indexPage -->
			<mt-tab-container v-model="active">
				<mt-tab-container-item id="indexPage">
					<indexpage @goML="goTab"></indexpage>
				</mt-tab-container-item>
			</mt-tab-container>
			<!-- 2. movieList -->
			<mt-tab-container v-model="active">
				<mt-tab-container-item id="movieList">
					<movielist></movielist>
				</mt-tab-container-item>
			</mt-tab-container>
			<!-- 3. ticket -->
			<mt-tab-container v-model="active">
				<mt-tab-container-item id="ticket">
					<cart></cart>
				</mt-tab-container-item>
			</mt-tab-container>
			<!-- 4. login -->
			<mt-tab-container v-model="active">
				<mt-tab-container-item id="me">
					<mylogin></mylogin>
				</mt-tab-container-item>
			</mt-tab-container>
			<!-- ============================= -->
			<!-- 底部导航条 -->
			<mt-tabbar v-model="active" fixed>
				<mt-tab-item id="indexPage">
					<tabbaricon :focused="active=='indexPage'" :selectedImage="require('../assets/img/home1.png')"
						:normalImage="require('../assets/img/home0.png')"></tabbaricon>
					<!--需要根据焦点切换-->
					主页
				</mt-tab-item>
				<mt-tab-item id="movieList">
					<tabbaricon :focused="active=='movieList'" :selectedImage="require('../assets/img/movie1.png')"
						:normalImage="require('../assets/img/movie0.png')"></tabbaricon>
					<!--需要根据焦点切换-->
					电影
				</mt-tab-item>
				<mt-tab-item id="ticket">
					<tabbaricon :focused="active=='ticket'" :selectedImage="require('../assets/img/ticket1.png')"
						:normalImage="require('../assets/img/ticket0.png')"></tabbaricon>
					<!--需要根据焦点切换-->
					历史
				</mt-tab-item>
				<mt-tab-item id="me">
					<tabbaricon :focused="active=='me'" :selectedImage="require('../assets/img/me1.png')"
						:normalImage="require('../assets/img/me0.png')"></tabbaricon>
					<!--需要根据焦点切换-->
					我的
				</mt-tab-item>
			</mt-tabbar>
		</div>
		<!--  -->
	</div>
</template>
<script>
	//--引入子组件: 顶部标题+底部tabbaricon...
	import TitleBar from './TitleBar.vue';
	import TabbarIcon from './TabbarIcon.vue';
	import MovieList from './MovieList.vue';
	import IndexPage from './IndexPage.vue';
	import Cart from './Cart.vue';
	import Login from './Login.vue';

	/* export */
	export default {
		data() { //data数据
			return {
				active: "indexPage", //默认显示
				currentIndex: [ //
					{
						isSelected: true
					}, //0
					{
						isSelected: false
					}, //1
					{
						isSelected: false
					}, //2
					{
						isSelected: false
					} //3
				] //
			}
		},
		//--注册子组件: 顶部标题+消息列表
		components: {
			"titlebar": TitleBar, //顶部标题
			"tabbaricon": TabbarIcon, //底部图片切换
			"movielist": MovieList, //消息列表
			"indexpage": IndexPage, //第一页
			"cart": Cart, //订票记录
			"mylogin": Login //
		},
		methods: {
			mysearch() {
				this.$toast("搜索"); //
			},
			goTab(val){
				// 切换到对应的tab
				this.active=val;
			},
			//--底部切换方法1: 设置:focused="active=='id值'"即可!!!
			//	数量不多的时候比较方便
			//--底部切换方法2: 事件--如果子元素过多理应使用事件委托
			//设置:focused="currentIndex[0~3].isSelected"
			select(n) { //点击切换选中状态
				//console.log(n);
				//循环数组--让下标n的状态为true
				for (var i = 0; i < this.currentIndex.length; i++) {
					if (n == i) {
						this.currentIndex[i].isSelected = true; //当前
					} else {
						this.currentIndex[i].isSelected = false; //其他
					}
				}
			}
		}
	}
</script>
<style scoped>
	body {
		margin: 0 !important;
	}
	/* 最外层父元素 */
	.v_container {
		overflow: hidden;
	}

	.page-wrap {
		overflow: auto;
		/*溢出显示滚动条*/
		padding-bottom: 60px;
		/*留出空间给底部导航60px*/
	}

	/* 修改tabbar颜色 */
	.mint-tabbar>.mint-tab-item {
		/*默认*/
		color: #345;
		/* font-family: "宋体"; */
	}

	.mint-tabbar>.mint-tab-item.is-selected {
		/*选中*/
		background-color: transparent;
		color: #d81e06;
	}
</style>