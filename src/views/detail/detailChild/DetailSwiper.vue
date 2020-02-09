<template>
  <!-- <div class="detail-swiper"> -->
  <swiper class="swiper1">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt />
    </swiper-item>
  </swiper>
  <!-- </div> -->
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";

export default {
  name: "DetailSwiper",
  data() {
    return {};
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  mounted() {},
  methods: {
    // imageLoad() {
    //   console.log("图片加载完成");
    // }
  }
};
</script>

<style scoped>
.swiper1 {
  height: 250px;
  overflow: hidden;
}
/* .detail-swiper{
  height: 500px;
} */
</style>