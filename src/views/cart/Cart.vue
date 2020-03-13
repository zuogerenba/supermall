<template>
  <div class="cart">
    <!-- 导航栏 -->
    <cart-nav-bar></cart-nav-bar>
    <scroll class="content" ref="scroll">
      <!-- 商品列表 -->
      <cart-list/>
    </scroll>
    <!-- 汇总 -->
  </div>
</template>

<script>
// import NavBar from 'components/common/navbar/NavBar'
import CartNavBar from "./cartChild/CartNavBar";
import CartList from "./cartChild/CartList";

import Scroll from "components/common/scroll/Scroll";

export default {
  name: "Cart",
  components: {
    CartNavBar,
    CartList,
    Scroll
  },
  data() {
    return {};
  },
  activated(){
    console.log('------');
    this.$refs.scroll.refresh()
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
.cart{
  position: relative;
  height: 100vh;
}
.content{
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>