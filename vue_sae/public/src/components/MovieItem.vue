<template>
  <div class="rootstyle">
    <!-- 子组件的子组件 Message.vue -->
    <div class="block1">
      <img :src="imgurl" class="imgstyle">
    </div>
    <div class="block2">
      <h4 class="title">{{title}}</h4>
      <p class="rank" v-if="rank!='0'">
        {{(rank).toFixed(1)}}
      </p>
      <p class="norank" v-if="rank=='0'">暂无评分</p>
      <p class="casts">演员
        <span v-for="(item,i) of casts" :key="i">
          {{item.name}}
        </span>
      </p>
      <p class="casts">导演
        <span>
          {{directors.name}}
        </span>
      </p>
      <p class="date">{{date}}</p>
    </div>
    <div class="block3" @click="itemClick(movieid)">
      <img src="../assets/img/arr1.png">
    </div>
  </div>
</template>
<script>
  /* export */
  export default {
    data() { //data数据
      return {
        //
      }
    },
    props: { //声明
      imgurl: {
        default: ""
      },
      title: {
        default: ""
      },
      casts: {
        type: Array
      },
      directors: {
        type: Object
      },
      rank: {
        default: ""
      },
      date: {
        default: ""
      },
      movieid: {
        default: ""
      }, //从list获取
      itemClick: {
        type: Function
      } //函数
    }
  }
</script>
<style scoped>
	body {
		margin: 0 !important;
	}
  /* 根元素样式 */
  .rootstyle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 180px;
  }

  /* 图片样式 */
  .imgstyle {
    width: 120px;
    height: 160px;
    /* padding: 5px; */
    margin: 10px auto;
  }

  /*ssssssssssss*/
  .block1 {
    width: 35%;
    height: 180px;
    text-align: center;
  }

  .block2 {
    width: 50%;
    height: 180px;
    padding-left: 10px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
  }

  .block2>h4,
  .block2>p {
    margin: 0;
  }

  .block2>h4 {
    color: rgb(122, 26, 26);
    width: 190px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .casts {
    width: 190px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    font-weight: bold;
  }

  .casts>span {
    font-size: 12px !important;
    font-weight: 400;
  }

  .rank {
    color: #d81e06;
    font-size: 14px;
  }

  .norank {
    color: #666;
    font-size: 14px;
  }

  .date {
    font-size: 12px;
  }
  
  .block3{
    height: 180px;
    width: 15%;
    text-align: center;
    /* background: #e5e5e5; */
    border-top-right-radius: 5px; 
    border-bottom-right-radius: 5px;
    box-shadow: #ddd -2px 1px 15px 0.01px;
  }
  .block3>img{
    width: 30px;
    height: 30px;
    margin: 75px auto;
  }
</style>