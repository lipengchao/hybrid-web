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
      // 判断购物车中是否已经包含该商品，如果购物车已经包含该商品，那么应该让商品的数量加1
      const isExist = state.shoppingDatas.some(item => {
        if (item.id === goods.id) {
          item.number += 1
          return true
        }
      })
      // 只有当购物车中不包含该商品的时候，才让商品push到shoppingDatas
      if (!isExist) {
        // 为商品新增属性
        // isCheck: 表示商品是否选中
        // number： 表示商品的数量
        // 通过Vue.set的方法可以把新添加的属性变为响应式数据
        // 如果直接通过goods.isCheck = false，那么isCheck不是响应式数据
        Vue.set(goods, 'isCheck', false)
        Vue.set(goods, 'number', 1)
        state.shoppingDatas.push(goods)
      }
    },
    /**
     * 更改指定的商品数量
     */
    changeShoppingNumber (state, data) {
      // index: 指定的商品
      // number: 商品的数量
      state.shoppingDatas[data.index].number = data.number
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
