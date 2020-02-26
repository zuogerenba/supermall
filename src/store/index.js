import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import state from './state'

//1.安装插件
Vue.use(Vuex)

//2.创建store对象
const store = new Vuex.Store({
  state,
  mutations,
  actions
})

//3.挂载
export default store