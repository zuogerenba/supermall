<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot  name="icon"></slot></div>
    <div v-else><slot  name="icon-active"></slot></div>
    <div :class="{active:isActive}"><slot name="text"></slot></div>
  </div>
</template>

<script>
export default {
    name:'TabBarItem',
    props:{
      path:String
    },
    data(){
      return{ 
        // isActive:true
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path) !== -1
      }
    },
    methods:{
      itemClick(){
        // console.log("object");
        this.$router.replace(this.path)
      }
    }
}
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
      height: 24px;
      width: 24px;
      margin-top: 3px;
      vertical-align: middle;
      margin-bottom: 2px;
  }  
  .active{
    color: red
  }  
</style>