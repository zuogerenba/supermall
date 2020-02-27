<template>
  <div id="cart">
    <nav-bar>
      <!-- <div slot="left"></div> -->
      <div slot="center">购物车({{cartLength}})</div>
      <!-- <div slot="right"></div> -->
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { mapGetters } from "vuex";

export default {
  name: "CartNavBar",
  
  components: { NavBar },
  computed: {
    ...mapGetters(['cartLength', 'cartList'])
    // cartLength(){
    //   return this.$store.state.cartList.length
    // }
  },
  created(){
    // console.log(cartList);
  },
  mounted() {
    
  },
  props: {},
  methods: {}
};
</script>

<style scoped>
#cart {
  background-color: rgb(255, 142, 151);
  color: white;
  /* font-weight: 700;加粗 */
}
</style>