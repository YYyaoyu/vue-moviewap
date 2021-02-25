<template>
  <div style="padding: 12px;">
    <div style="overflow:hidden;">
      <span class="city">合肥</span>
      <van-search v-model="value" placeholder="搜影片、影院、演出" />
    </div>
    <van-tabs v-model="active">
      <van-tab title="热映">
        <van-pull-refresh v-model="isrefreshmovie" @refresh="onRefreshMovie">
          <van-list
            v-model="isloadingmovie"
            :finished="finishedmovie"
            :offset="50"
            finished-text="没有更多了"
            loading-text="加载中"
            @load="onLoadMovie"
            class="movielist"
          >
            <ul>
              <li
                v-for="item in movielist"
                :key="item.id"
                :title="item.name"
                style="overflow:hidden;"
              >
                <img :src="item.cover" />
                <div class="movieitem">
                  <div class="moviedetail">
                    <h4 style="color: #000;font-size: 1.1rem;">{{item.name}}</h4>
                    <div style="margin-bottom: 4px;">
                      评分
                      <span style="color: rgb(255,156,28);font-weight: bold;">{{item.rate}}</span>
                    </div>
                    <div style="margin-bottom: 4px;">导演：{{item.dir}}</div>
                    <div style="margin-bottom: 4px;">主演：{{item.star}}</div>
                  </div>
                  <div class="moviebuy">
                    <a>购票</a>
                  </div>
                </div>
              </li>
            </ul>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="影院">
        <van-dropdown-menu>
          <van-dropdown-item title="全城" ref="item">
            <van-tree-select height="55vw" :items="ditems" :active-id.sync="activeId" :main-active-index.sync="activeIndex" />
          </van-dropdown-item>
          <van-dropdown-item title="筛选" ref="item">
            <div style="padding: 5px 16px;">
              <van-button type="danger" block round>确认</van-button>
            </div>
          </van-dropdown-item>
          <van-dropdown-item v-model="order" :options="orders" />
        </van-dropdown-menu>
        <van-pull-refresh v-model="isrefreshcinema" @refresh="onRefreshCinema">
          <van-list
            v-model="isloadingcinema"
            :finished="finishedcinema"
            :offset="50"
            finished-text="没有更多了"
            loading-text="加载中"
            @load="onLoadCinema"
            class="cinemalist"
          >
            <ul>
              <li
                v-for="item in cinemalist"
                :key="item.id"
                :title="item.name"
                style="overflow:hidden;"
              >
                <div class="cinemaitem">
                  <span style="color: #000;font-size: 1.1rem;font-weight: bold;margin-bottom: 6px;">{{item.name}}</span>
                  <span style="color: rgb(255,156,28);">{{item.rate}}</span>
                </div>
                <div class="cinemaitem">{{item.address}}</div>
                <div class="cinemaitem"><span style="display:inline-block;font-size: 0.8rem;border: 2px solid rgb(202, 202, 202);padding: 2px;
    transform: scale(0.8);">{{item.item}}</span></div>
                
              </li>
            </ul>
          </van-list>
        </van-pull-refresh>
      </van-tab>
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
      isloadingmovie: false,
      isrefreshmovie: false,
      finishedmovie: false,
      isloadingcinema: false,
      isrefreshcinema: false,
      finishedcinema: false,
      movielist: [],
      moviepage: 1,
      cinemalist: [],
      cinemapage: 1,
      orders: [
        { text: "综合排序", value: 0 },
        { text: "综合排序", value: 1 },
        { text: "综合排序", value: 2 }
      ],
      order: 1,
      ditems: [
        {
          // 导航名称
          text: "所有城市",
          // 导航名称右上角徽标，2.5.6 版本开始支持
          badge: 3,
          // 是否在导航名称右上角显示小红点
          dot: true,
          // 导航节点额外类名
          className: "my-class",
          // 该导航下所有的可选项
          children: [
            {
              // 名称
              text: "温州",
              // id，作为匹配选中状态的标识符
              id: 1,
              // 禁用选项
              disabled: true
            },
            {
              text: "杭州",
              id: 2
            }
          ]
        }
      ],
      activeId: '3401021',
      activeIndex: 1,
    };
  },
  created() {
    this.getDistricts('340100');
  },
  methods: {
    getDistricts(cityid) {
      let that = this;
      let data = {
        cityid: cityid,
      };
      axios({
        method: "post",
        url: "/test/index.php/common/Region/getTreeDistricts",
        data: qs.stringify(data)
      })
        .then(function(response) {
          that.ditems = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getFilmList() {
      let that = this;
      let data = {
        page: that.moviepage,
        num: 10
      };
      axios({
        method: "post",
        url: "/test/index.php/admin/FilmInfo/search",
        data: qs.stringify(data)
      })
        .then(function(response) {
          that.count = response.data.count;
          if (that.moviepage == 1) {
            that.movielist = [];
          }
          that.movielist = that.movielist.concat(response.data.datalist);
          console.log(that.movielist);
          if (response.data.datalist.length < 10) {
            that.finishedmovie = true;
          } else {
            that.moviepage++;
          }
          that.isloadingmovie = false;
          that.isrefreshmovie = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getCinemaList() {
      let that = this;
      let data = {
        page: that.cinemapage,
        num: 10
      };
      axios({
        method: "post",
        url: "/test/index.php/admin/CinemaInfo/search",
        data: qs.stringify(data)
      })
        .then(function(response) {
          that.count = response.data.count;
          if (that.cinemapage == 1) {
            that.cinemalist = [];
          }
          that.cinemalist = that.cinemalist.concat(response.data.datalist);
          console.log(that.cinemalist);
          if (response.data.datalist.length < 10) {
            that.finishedcinema = true;
          } else {
            that.cinemapage++;
          }
          that.isloadingcinema = false;
          that.isrefreshcinema = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onLoadMovie() {
      this.getFilmList();
    },
    onRefreshMovie() {
      this.moviepage = 1;
      this.isrefreshmovie = true;
      this.finishedmovie = false;
      this.getFilmList();
    },
    onLoadCinema() {
      this.getCinemaList();
    },
    onRefreshCinema() {
      this.cinemapage = 1;
      this.isrefreshcinema = true;
      this.finishedcinema = false;
      this.getCinemaList();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.van-search {
  float: right;
  width: calc(100% - 52px);
  padding: 0;
}
.city {
  float: left;
  line-height: 34px;
  width: 40px;
}
.van-list {
  margin-bottom: 50px;
}
.movielist li {
  border-bottom: 1px solid rgb(248, 248, 248);
  padding: 5px 0;
}
.movielist ul li img {
  float: left;
  width: 60px;
  height: 80px;
  border-radius: 8px;
}
.movieitem {
  width: calc(100% - 70px);
  margin-left: 70px;
  text-align: left;
  font-size: 0.8rem;
  color: rgb(90, 90, 90);
}
.moviebuy {
  float: right;
  position: relative;
  top: 30px;
}
.moviebuy a {
  display: inline-block;
  padding: 3px 10px;
  color: #fff;
  border-radius: 8px;
  background: rgb(255, 54, 120);
}
.moviedetail {
  float: left;
}
.moviedetail h4 {
  margin-bottom: 8px;
}
.cinemaitem{
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  font-size: 0.8rem;
  color: rgb(90, 90, 90);
  margin-bottom: 4px;
}
.cinemalist li{
  border-top: 1px solid rgb(248, 248, 248);
  padding: 10px 0;
}
.van-dropdown-menu /deep/ .van-ellipsis{
  font-size: 0.95rem;
}
.van-tree-select__content /deep/ {
  background-color: rgb(245,245,245);
}
.van-sidebar-item--select /deep/, .van-sidebar-item--select:active /deep/{
  background-color: rgb(245,245,245) !important;
}
.van-tree-select__nav-item /deep/{
  background-color: #fff;

}

</style>
