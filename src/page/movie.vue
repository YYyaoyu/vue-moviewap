<template>
  <div class="">
    <div>
      <span class="city">合肥</span>
      <van-search v-model="value" placeholder="请输入搜索关键词" />
    </div>

  </div>
</template>

<script>
export default {
  name: 'movie',
  data () {
    return {
      value: '',
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-search{
  float: right;
  width: calc(100% - 52px);
}
.city{
  float: left;
  padding: 10px 0 10px 12px;
  line-height: 34px;
  width: 40px;
}
</style>
