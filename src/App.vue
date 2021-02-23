<template>
  <div id="app">
    <router-view />
    <van-tabbar route v-model="active" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item replace to="/movie" icon="wap-home-o">电影</van-tabbar-item>
      <van-tabbar-item replace to="/myinfo" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      active: 0
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
ul,li,h1,h2,h3,h4,p{
  margin: 0;
  padding: 0;
}
html{
  font-size: 14px;
}
</style>
