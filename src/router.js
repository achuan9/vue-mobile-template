import Vue from 'vue'
import Router from 'vue-router'
import { getUserInfo } from '@/utils/user' // get token from cookie

import BaseLayout from './layout/BaseLayout'

import Login from './views/login'
import GoodsList from './views/goods/list'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      component: BaseLayout,
      redirect: '/goods/list',
      children: [
        {
          path: '/goods/list',
          name: 'GoodsList',
          component: GoodsList,
          meta: { title: '商品列表', cache: true }
        },
        {
          path: '/goods/detail/:id',
          name: 'GoodsDetail',
          component: () =>
            import(/* webpackChunkName: "GoodsDetail" */ './views/goods/detail'),
          meta: { title: '商品详情', cache: false }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { title: '登录' }
    }
  ]
})

router.beforeEach(async(to, from, next) => {
  document.title = to.meta.title
  next()
  // const userInfo = getUserInfo()
  // if (!userInfo.operatorId && to.path !== '/login') {
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }
})

export default router
