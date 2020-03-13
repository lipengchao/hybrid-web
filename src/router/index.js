import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    meta: { index: 0 },
    component: Main
  },
  {
    path: '/goodsList',
    name: 'GoodsList',
    meta: { index: 1 },
    component: () => import('../views/GoodsList.vue')
  },
  {
    path: '/goodsDetail',
    name: 'GoodsDetail',
    meta: { index: 2 },
    component: () => import('../views/GoodsDetail.vue')
  },
  {
    path: '/buy',
    name: 'Buy',
    meta: { index: 3 },
    component: () => import('../views/Buy.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
