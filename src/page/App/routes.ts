export default [
  {
    path: '/welcome',
    title: '欢迎',
    component: () => import('../Welcome'),
  },
  {
    path: '/index',
    title: '主页',
    component: () => import('../Index'),
  },
];
