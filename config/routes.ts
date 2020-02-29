// eslint-disable-next-line
import { IRoute } from 'umi-types';

const routes: IRoute[] = [
  {
    path: '/',
    exact: true,
    redirect: '/welcome'
  },
  {
    path: '/mobile',
    // component: '../layouts/MobileWrapper',
    routes: [
      {
        path: '/mobile/list-demo',
        component: './ListDemo',
        title: '列表'
      }
    ]
  },
  {
    path: '/welcome',
    component: './Welcome',
    title: '欢迎'
  },
  {
    path: '/home',
    component: './Home',
    title: '主页'
  }
];

export default routes;
