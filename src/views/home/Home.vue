<template>
  <div id="home">
    <nav-bar class="home-nva">
      <p slot="center">购物街</p>
    </nav-bar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from './childComps/RecomendView'

import { getHomeMultiData } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data() {
    return {
      // result:null 所有的数据
      banners: [],
      recommends: []
    };
  },
  created() {
    //请求多个数据
    getHomeMultiData().then(res => {
      // console.log(res);
      // this.result = res.data;  //调用结束时res会被回收，需要保存到数据里
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      console.log(this.banners[0].link);
    });
  }
};
</script>

<style scoped>
.home-nva {
  background-color: var(--color-tint);
  color: aliceblue;
}
</style>