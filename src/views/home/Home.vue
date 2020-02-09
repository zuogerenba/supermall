<template>
  <div id="home">
    <nav-bar class="home-nva"><p slot="center">蘑菇街</p></nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
                   @tabClick="tabClick" 
                   ref="tabControl1"
                   class="tab-control" v-show="isTabFixed"/>
    <scroll
      class="content"
      ref="content"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @loadMore="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" 
                   @tabClick="tabClick" 
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecomendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultiData, getGoods } from "network/home";
import { debounce } from "../../common/utils"

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      // result:null 所有的数据
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShow: false,
      tabOffsetTop:0,
      isTabFixed:false
    };
  },

  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultiData();

    //2.商品数据的请求
    this.getGoods("pop");
    this.getGoods("new");
    this.getGoods("sell");
  },
  mounted() {
    const refresh = debounce(this.$refs.content.refresh, 500);

    //3.监听图片加载完成
    this.$bus.$on("itemImgLoad", () => {
      // console.log('-----------');
      // this.$refs.content.refresh();
      refresh();
    });
  },
  methods: {
    /**
     * 下面是事件监听相关代码
     */

    //监听流行，新款，热卖事件
    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl2.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
    },

    backClick() {
      console.log("返回顶部");

      this.$refs.content.backTo(0, 0, 200);
    },

    contentScroll(position) {
      //1.判断backTop是否显示
      this.isShow = (-position.y) > 600;

      //2.决定tabControl是否吸顶
    this.isTabFixed = (-position.y) > this.tabOffsetTop
    },

    /**
     * 下面是网络请求相关代码
     */
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        // console.log(res);
        // this.result = res.data;  //调用结束时res会被回收，需要保存到数据里
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // console.log(this.banners[0].link);
      });
    },

    getGoods(type) {
      const page = this.goods[type].page + 1;
      getGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // console.log(this.goods[type].list[0].show.img);

        this.$refs.content.finishPullUp()
      });
    },

    loadMore(type){
      this.getGoods(this.currentType)

      // this.$refs.content.scroll.refresh()
    },

    swiperImageLoad(){
      this.tabOffsetTop =this.$refs.tabControl2.$el.offsetTop
      console.log(this.tabOffsetTop);
    }
  }
};
</script>

<style scoped>
.tab-control{
  position: relative;
  z-index: 9;
}
/* .fixed{
  position: fixed;
  right: 0;
  left: 0;
  top: 44px;
} */
.content {
  /* height: 470px; */
  /* height: calc(100% - 93px);
  margin-top: 44px; */
  /* overflow: hidden; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nva {
  background-color: var(--color-tint);
  color: aliceblue;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;  原生(避免跟网页一起滚动)才需要，better-scroll 后滚动区域只有中间部分，所以不需要了 */
}
/* .tab-control {
  /* position: sticky;
  top: 44px;
} */ 
</style>