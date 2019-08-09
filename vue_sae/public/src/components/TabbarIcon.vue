<template>
  <div>
		<!-- 子组件 TabbarIcon.vue --><!--需要根据焦点切换-->
    <img :src="focused?selectedImage:normalImage" class="imgstyle">
	</div>
</template>
<script>
	/* export */
	export default {
		data(){	//data数据
			return {
        //
			}
		},
    props: { //声明要接收父组件的数据
      focused:false, //根据焦点判断选择的图片
      selectedImage: { default: "" }, //绿色
      normalImage: { default: "" } //灰色
    }
	}
</script>
<style scoped>
	body {
		margin: 0 !important;
	}
  .imgstyle{
    width: 30px;
    height: 30px;
  }
</style>