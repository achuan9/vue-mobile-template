import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store'
import { setToken, getToken, canTurnTo } from '@/libs/util'
import routerConfig from './routerConfig';

/**
 * 将路由配置扁平化
 * @param {Array} config 路由配置
 * @return {Route}
 * @example
 * { path: '/process', layout: LayoutMain, component: NotFound },
 * { path: '/process/plant/list', layout: LayoutMain, component: ProcessPlantList, navPath: [{name: '生产过程'}, {name: '播种记录', path: '/process/plant/list'}] },
 * { path: '/process/plant/detail', layout: LayoutMain, component: ProcessPlantDetail, navPath: [{name: '生产过程'}, {name: '播种记录', path: '/process/plant/list'}, {name: '详情', path: '/process/plant/detail'}] },
 */

const routerMap = [];
const LOGIN_PAGE_NAME = 'Login'
const turnTo = (to, access, next) => {
    if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
    else next({ replace: true, name: 'NotFound' }) // 无权限，重定向到401页面
  }

const recursiveRouterConfig = (config = []) => {
  config.forEach((item) => {

    const route = {
      path: item.path,
      name:  item.layout ? "" : item.name,
      component: item.layout || item.component,
      children: item.layout ? [{
        path: '',
        name: item.name,
        component: item.component,
      }, ] : [],
    };
    if (Array.isArray(item.children)) {
      recursiveRouterConfig(item.children);
    }
    routerMap.push(route);
  });

  return routerMap;
};

const routes = recursiveRouterConfig(routerConfig);

Vue.use(Router);

const router = new Router({
  routes,
});


router.beforeEach((to, from, next) => {

    const token = getToken()

    if (!token && to.name !== LOGIN_PAGE_NAME) {
      // 未登录且要跳转的页面不是登录页
      next({
        name: LOGIN_PAGE_NAME // 跳转到登录页
      })
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
      // 未登陆且要跳转的页面是登录页
      next() // 跳转
    } else if (token && to.name === LOGIN_PAGE_NAME) {
      // 已登录且要跳转的页面是登录页
      next({
        // name: homeName // 跳转到homeName页
      })
    } else {

      if (store.state.user.hasGetInfo) {
        turnTo(to, store.state.user.access, next)
      } else {
        store.dispatch('getUserInfo').then(user => {
          // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
          turnTo(to, user.access, next)
        }).catch(() => {
          setToken('')
          next({
            name: LOGIN_PAGE_NAME
          })
        })
      }
    }
  })

  router.afterEach(to => {
    // setTitle(to, router.app)
    // iView.LoadingBar.finish()
    window.scrollTo(0, 0)
  })

export default router
