<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"/>
  
  </div>
</template>

<script>
import DetailNavBar from "./detailChild/DetailNavBar";
import DetailSwiper from "./detailChild/DetailSwiper"
import { getDetail } from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: []
    };
  },

  components: {
    DetailNavBar,
    DetailSwiper
  },
  created() {
    // console.log(this.$route.params);

    this.iid = this.$route.params.iid;

    //2.根据iid请求数据
    getDetail(this.iid).then(res => {
      console.log(res);
      this.topImages = res.result.itemInfo.topImages;
      // console.log(this.topImages);
    });
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
</style>