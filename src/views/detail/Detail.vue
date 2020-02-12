<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" />
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./detailChild/DetailNavBar";
import DetailSwiper from "./detailChild/DetailSwiper";
import DetailBaseInfo from "./detailChild/DetailBaseInfo";
import DetailShopInfo from "./detailChild/DetailShopInfo";
import DetailGoodsInfo from "./detailChild/DetailGoodsInfo";
import DetailParamInfo from "./detailChild/DetailParamInfo"
import DetailCommentInfo from "./detailChild/DetailCommentInfo"

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList"

import { getDetail, Goods, Shop, GoodsParam,getRecommend } from "network/detail";
import { debounce } from "../../common/utils"

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo:{},
      commentInfo:{},
      recommends:[]
    };
  },

  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList
  },
  created() {
    //1.保存传入的id
    this.iid = this.$route.params.iid;

    //2.根据iid请求数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      //1.获取轮播图图片
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      //2.获取整合后的标题，配送，价格信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //3.获取商家店铺信息
      this.shop = new Shop(data.shopInfo);

      //4.保存商品详情数据
      this.detailInfo = data.detailInfo;

      //5.商品参数
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //6.取出评论信息
      if(data.rate.cRate !== 0 ){
        this.commentInfo = data.rate.list[0]
      }
    });

    //3.获得推荐图片数据
    getRecommend().then(res=>{
      this.recommends = res.data.list
      console.log(this.recommends);
    })
  },
  mounted() {
     const refresh = debounce(this.$refs.scroll.refresh, 500);

    //3.监听图片加载完成
    this.$bus.$on("detailItemImgLoad", () => {
      console.log('-----------');
      // this.$refs.content.refresh();
      refresh();
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    },
    titleClick(index){
      console.log(index);
    }
    
  }
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px);
  /* height: 530px; */
  /* overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0; */
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>