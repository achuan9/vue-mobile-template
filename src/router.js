import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/echarts',
      name: 'echarts',
      component: () => import(/* webpackChunkName: "echarts" */ './views/Echarts/Index.vue')
    },
    {
      path: '/elementui',
      name: 'elementui',
      component: () => import(/* webpackChunkName: "elementui" */ './views/ElementUI/Index.vue')
    }
  ]
})
