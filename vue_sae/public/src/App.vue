<template>
	<div class="app-container">
		<!-- <router-view></router-view> -->
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<style>
	body {
		margin: 0 !important;
	}
	.app-container {
		padding-top: 0px;
		/*原自带上内边距40px*/
		padding-bottom: 0px;
		/*原自带下内边距50px*/
		overflow-x: hidden;
	}

	.mui-bar-tab .mui-tab-item-tao.mui-active {
		color: #007aff;
	}

	.mui-bar-tab .mui-tab-item-tao {
		display: table-cell;
		overflow: hidden;
		width: 1%;
		height: 50px;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #929292;
	}

	.mui-bar-tab .mui-tab-item-tao .mui-icon {
		top: 3px;
		width: 24px;
		height: 24px;
		padding-top: 0;
		padding-bottom: 0;
	}

	.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
		font-size: 11px;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;

	}
</style>