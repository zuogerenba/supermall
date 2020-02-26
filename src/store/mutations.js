export default{
  //mutations作用就是修改state的状态
  //mutations中每个方法尽可能完成的事情比较单一点，做一件事情最好
  addCounter(state,payload){
    payload.count++
    console.log(payload.count);
  },
  addToCart(state,payload){
    state.cartList.push(payload)
  }
  
}