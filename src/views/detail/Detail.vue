<template>
  <div id="detail">
    <detail-nav-bar />
    <scroll class="content">
      <div>
        <detail-swiper :topImages="topImages" />
        <detail-base-info :goods="goods" />
        <detail-shop-info :shop="shop" />
      </div>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./detailChild/DetailNavBar";
import DetailSwiper from "./detailChild/DetailSwiper";
import DetailBaseInfo from "./detailChild/DetailBaseInfo";
import DetailShopInfo from "./detailChild/DetailShopInfo";

import Scroll from "components/common/scroll/Scroll";

import { getDetail, Goods, Shop } from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {}
    };
  },

  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll
  },
  created() {
    //1.保存传入的id
    this.iid = this.$route.params.iid;

    //2.根据iid请求数据
    getDetail(this.iid).then(res => {
      console.log(res);
      //1.获取轮播图图片
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // console.log(this.topImages);
      //2.获取整合后的标题，配送，价格信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // console.log(this.goods);
      //3.获取商家店铺信息
      this.shop = new Shop(data.shopInfo);
      console.log(this.shop);
    });
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 1;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 54px);
  /* height: 530px; */
  /* overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0; */
}
</style>