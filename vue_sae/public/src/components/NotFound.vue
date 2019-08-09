<template>
  <div class="hello">
    <div class="MY">
      <h2>{{ msg }}</h2>
    </div>
  </div>
</template>
 
<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: "404 NOT FOUND ..." //
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	body {
		margin: 0 !important;
	}
  .MY {
    color: rgb(226,79,79);
    text-align: center;
  }
  .MY>h2{
    margin: 300px auto;
  }
</style>