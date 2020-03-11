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
    name: 'goodsList',
    meta: { index: 1 },
    component: () => import('../views/GoodsList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
