import BackTop from "components/content/backTop/BackTop"
export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop:false
    }
  },
  methods:{
    backClick() {
      this.$refs.scroll.backTo(0, 0, 200);
      console.log('-----------');
    }
  }
}