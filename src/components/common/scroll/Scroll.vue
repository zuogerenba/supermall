<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  components: {},
  mounted() {

    //建立better-scroll并设置属性
    this.scroll = new BScroll(this.$refs.wrapper, {
      pullUpLoad: this.pullUpLoad,
      click: true,
      probeType: this.probeType
    });

    //到底部的监听
    this.scroll.on("pullingUp", () => {
      // console.log("上拉加载更多");
      this.$emit("loadMore")
    });

    //滚动位置监听
    this.scroll.on("scroll", position => {
      // console.log(position);
      this.$emit('scroll',position)
    });
  },
  methods: {

    //封装回到顶部函数，供父组件调用，这样父组件就隔离了better-scroll内部函数
    backTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    
    //封装结束上拉加载函数
    finishPullUp(){
      this.scroll.finishPullUp()
    }
    

  }
};
</script>

<style scoped>
</style>