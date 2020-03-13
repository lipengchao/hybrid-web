import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 购物车数据源
    shoppingDatas: []
  },
  mutations: {
    /**
     * 添加商品到购物车数据源
     */
    addShoppingData (state, goods) {
      state.shoppingDatas.push(goods)
    }
  },
  getters: {
    shoppingDatas: state => state.shoppingDatas
  },
  actions: {
  },
  modules: {
  }
})
