<template>
  <div class="goods-list">
    <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
    <!-- {{goods}} -->
    
  </div>
</template>

<script>

import GoodsListItem from './GoodsListItem'

export default {
  name:'GoodsList',
  components:{
    GoodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods-list{
  display: flex;

  /* 包裹还是布包裹 */
  flex-wrap: wrap;

  /* 使流行下面两张图片均等分空间 */
  justify-content: space-around;

}
</style>