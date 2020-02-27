<template>
  <div>
    <!-- <li v-for="item in list">{{item}}</li> -->
    <cart-list-item v-for="(item,index) in list" :key="index" :product="item"></cart-list-item>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  components: {
    CartListItem
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      list: "cartList"
    })
    // ...mapGetters(['cartList'])
  },
  mounted() {},
  props: {},
  methods: {}
};
</script>

<style scoped>
</style>