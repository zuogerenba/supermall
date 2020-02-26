export default{
  addCart(context,payload){
    console.log(context,payload);
    // state.cartList.push(payload)
    //1.查找之前数组中是否存在新进来的商品id
    let oldProduct = context.state.cartList.find(item => item.iid ===payload.iid) //找到了就返回true 返回只有一行可以省略return
    //2.判断oldProduct
    if(oldProduct){
      // oldProduct.count++
      context.commit('addCounter',oldProduct)
    }else{
      payload.count = 1
      // state.cartList.push(payload)
      context.commit('addToCart',payload)
    }
  }
}