<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="banners.link" >
      <a :href="item.link">
        <img :src="item.image" alt  @load="imageLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper/index.js";
// import Swiper from "components/common/swiper/index.js";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  data(){
    return{
      isLoad:false
    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods:{
    imageLoad(){
      // console.log('轮播图加载完成');
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
      
    }
  }
};
</script>

<style>
</style>