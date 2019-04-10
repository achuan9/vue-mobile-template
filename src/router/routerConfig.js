// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容

import LayoutMain from '@/layout/LayoutMain';

import NotFound from '@/views/NotFound/Index';

//登录模块
import Login from '@/views/Login/Index';
//首页
import Home from '@/views/Home/Index';


//如果不配置layout就是在App.vue都路由下
const routerConfig = [
  { path: '/login', name: "Login", component: Login },

  { path: '/', name: "Home", layout: LayoutMain, component: Home },

  { path: '/park-lot/list', name: "ParkLotList", layout: LayoutMain, component: () => import(/* webpackChunkName: "ParkLotList" */ '@/views/ParkLot/ParkLotList.vue') },
  { path: '/park-lot/car', name: "ParkLotCar", layout: LayoutMain, component: () => import(/* webpackChunkName: "ParkLotCar" */ '@/views/ParkLot/ParkLotCar.vue') },

  { path: '/park-space/list', name: "ParkSpaceList", layout: LayoutMain, component: () => import(/* webpackChunkName: "ParkSpaceList" */ '@/views/ParkSpace/ParkSpaceList.vue') },
  { path: '/info/list', name: "InfoList", layout: LayoutMain, component: () => import(/* webpackChunkName: "InfoList" */ '@/views/Info/InfoList.vue') },
  { path: '/info/release', name: "InfoRelease", layout: LayoutMain, component: () => import(/* webpackChunkName: "InfoRelease" */ '@/views/Info/InfoRelease.vue') },

  { path: '*', name: "NotFound", layout: LayoutMain, component: NotFound },
];

export default routerConfig;
