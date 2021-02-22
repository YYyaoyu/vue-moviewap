<template>
  <div class>
    <div style="overflow:hidden;">
      <span class="city">合肥</span>
      <van-search v-model="value" placeholder="搜影片、影院、演出" />
    </div>
    <van-tabs v-model="active">
      <van-tab title="热映">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <ul v-for="item in movelist" :key="item.id" :title="item.name">
            <li style='height:100px;'>ddd</li>
          </ul>
        </van-list>
      </van-tab>
      <van-tab title="影院">影院</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "movie",
  data() {
    return {
      value: "",
      active: 0,
      loading: false,
      finished: false,
      movelist: [],
    };
  },
  created() {
  },
  methods: {
    getFilmList(page) {
      let that = this;
      let data = {
        page: page || 1,
        num: 10,
      };
      axios({
        method: "post",
        url: "/test/index.php/admin/FilmInfo/search",
        data: qs.stringify(data)
      })
        .then(function(response) {
          that.count = response.data.count;
          that.movelist = response.data.datalist;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onLoad() {
      console.log(9)
      this.getFilmList();

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-search {
  float: right;
  width: calc(100% - 52px);
}
.city {
  float: left;
  padding: 10px 0 10px 12px;
  line-height: 34px;
  width: 40px;
}
/* .van-tab__pane{
  width: 50%;
} */
</style>
