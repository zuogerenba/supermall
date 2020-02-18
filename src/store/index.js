import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建store对象
const store = new Vuex.Store({
  state:{
    cartList:[
    ]
  },
  mutations:{
    //mutations作用就是修改state的状态
    //mutations中每个方法尽可能完成的事情比较单一点，做一件事情最好
    addCart(state,payload){
      // state.cartList.push(payload)
      //1.查找之前数组中是否存在新进来的商品id
      let oldProduct = state.cartList.find(item => item.iid ===payload.iid) //找到了就返回true
      //2.判断oldProduct
      if(oldProduct){
        oldProduct.count++
      }else{
        payload.count = 1
        state.cartList.push(payload)
      }
    }
  }
})

//3.挂载
export default store