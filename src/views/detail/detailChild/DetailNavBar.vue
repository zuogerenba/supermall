<template>
  <div id="detail">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item,index) in titles"
          class="title-item"
          :class="{active:index===currentIndex}"
          @click="itemClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data() {
    return {
      // iid:null
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },

  components: {
    NavBar
  },
  created() {
    // console.log(this.$route.params);
    // this.iid = this.$route.params.iid
  },
  mounted() {},
  methods: {
    //1.标题的点击事件
    itemClick(index) {
      this.currentIndex = index;
    },

    //2.返回的点击事件
    backClick(){
      // this.$router.go(-1)
      this.$router.back()
      // this.$$router.push('/home') 无法保持keep-alive
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active{
  /* color: #ff5777 */
  color: var(--color-high-text)
}
.back{
  margin-top: 10px;
  margin-left: 7px
}
</style>