<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <div>{{$store.state.cartList.length}}</div>
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from "./detailChild/DetailNavBar";
import DetailSwiper from "./detailChild/DetailSwiper";
import DetailBaseInfo from "./detailChild/DetailBaseInfo";
import DetailShopInfo from "./detailChild/DetailShopInfo";
import DetailGoodsInfo from "./detailChild/DetailGoodsInfo";
import DetailParamInfo from "./detailChild/DetailParamInfo";
import DetailCommentInfo from "./detailChild/DetailCommentInfo";
import DetailBottomBar from "./detailChild/DetailBottomBar"

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";


import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import { debounce } from "../../common/utils";
import {backTopMixin} from "../../common/mixin"

export default {
  name: "Detail",
  mixins:[backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex:0
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
    GoodsList,
    DetailBottomBar
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
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    //3.获得推荐图片数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
      // console.log(this.recommends);
    });
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500);

    //3.监听图片加载完成
    this.$bus.$on("detailItemImgLoad", () => {
      // console.log('-----------');
      // this.$refs.content.refresh();
      refresh();
    });
  },
  // updated() {
  //   this.themeTopYs = []

  //   this.themeTopYs.push(0);
  //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

  //   console.log(this.themeTopYs);
  // },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();

      this.themeTopYs = [];

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      console.log(this.themeTopYs);
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.backTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      //是否显示回到顶部
      this.isShowBackTop = (-position.y) > 600;
      // console.log(position);
      // 1.获取y值
      const positionY = -position.y;
      let length = this.themeTopYs.length;

      //2.positionY与主题的y对比
      // [y1,y2,y3,y4] [y1,y2)=0 [y2,y3)=1 [y3,y4)=2 y>y4 -> 3
      for (let i=0; i <length; i++) {
        if (this.currentIndex != i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i+ 1]) ||
          (i === length - 1 && positionY > this.themeTopYs[i]))
        ) {
          // console.log(i);
          this.currentIndex = i; //供上面判断使用
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    addToCart(){
      console.log('加入购物车!');
      const product = {}
      //1.获取购物车展示需要的信息
      product.image = this.topImages[0]
      product.title = this.detailInfo.title
      product.desc = this.detailInfo.desc
      product.price = this.goods.newPrice
      product.iid = this.iid

      //2.将商品添加到购物车里 moutions修改方法
      // this.$store.commit('addCart',product)

      //2.将商品添加到购物车里 actions修改方法
      this.$store.dispatch('addCart',product)
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