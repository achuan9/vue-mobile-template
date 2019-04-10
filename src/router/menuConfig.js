// 菜单配置
// headerToggleConfig: 头部切换链接配置
// asideMenuConfig：侧边导航配置

const headerToggleConfig = [

];

const asideMenuConfig = [
  {
    path: '/',
    name: '首页',
    icon: 'el-icon-menu',
  },
  {
    path: "/park-lot",
    name: '停车场管理',
    icon: 'el-icon-lot',
    children: [
      {
        path: '/list',
        name: '停车场列表',
      },
      {
        path: '/car',
        name: '查找车辆',
      }
    ],
  },
  {
    path: '/park-space',
    name: '车位管理',
    icon: 'el-icon-space',
    children: [
      {
        path: '/list',
        name: '停车位列表',
      }
    ],
  },
  {
    path: '/info',
    name: '信息管理',
    icon: 'el-icon-info',
    children: [
      {
        path: '/list',
        name: '信息列表',
      },
      {
        path: '/release',
        name: '信息发布',
      }
    ],
  },
  {
    path: '/park',
    name: '停车管理',
    icon: 'el-icon-park',
    children: [
      {
        path: '/area',
        name: '区域管理',
      },
      {
        path: '/record',
        name: '停车记录',
      }
    ],
  },
  {
    path: '/operator',
    name: '操作员管理',
    icon: 'el-icon-operator',
    children: [
      {
        path: '/operator-account',
        name: '操作员账号',
      },
      {
        path: '/operator-role',
        name: '操作员角色',
      }
    ],
  },
  {
    path: '/park-count',
    name: '停车记录统计',
    icon: 'el-icon-count',
    children: [
      {
        path: '/park-count-search',
        name: '停车记录查询',
      }
    ],
  },
  {
    path: '/map',
    name: '地图管理',
    icon: 'el-icon-map'
  },
  {
    path: '/screen',
    name: '引导屏管理',
    icon: 'el-icon-screen',
    children: [
      {
        path: '/screen-list',
        name: '引导屏列表',
      },
      {
        path: '/screen-info-release',
        name: '信息发布',
      },
      {
        path: '/screen-release-records',
        name: '信息发布记录',
      }
    ],
  },
];

export { headerToggleConfig, asideMenuConfig };
