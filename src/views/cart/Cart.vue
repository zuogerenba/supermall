<template>
  <div class="cart">
    <cart-nav-bar></cart-nav-bar>
    <scroll class="content">
      <cart-list/>
    </scroll>
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