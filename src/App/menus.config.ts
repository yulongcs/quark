const menus = [
  {
    icon: 'home',
    id: '/home',
    label: 'Home',
    path: '/home'
  },
  {
    icon: 'user',
    id: 'users',
    label: '用户管理',
    path: '/users',
    sub: [
      { id: '/users/customer', label: '前台用户', path: '/users/customer' },
      { id: '/users/admin', label: '后台用户', path: '/users/admin' }
    ]
  },
  {
    icon: 'area-chart',
    id: '/echarts',
    label: 'Echarts',
    path: '/echarts'
  },
  {
    icon: 'cloud-o',
    id: '/404',
    label: '404',
    path: '/404'
  }
];

export default menus;
