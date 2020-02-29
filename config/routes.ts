// eslint-disable-next-line
import { IRoute } from 'umi-types';

const routes: IRoute[] = [
  {
    path: '/',
    exact: true,
    redirect: '/welcome'
  },
  {
    path: '/welcome',
    component: './Welcome',
    title: '欢迎'
  },
  {
    path: '/mobile',
    exact: true,
    redirect: '/mobile/home'
  },
  {
    path: '/mobile',
    routes: [
      {
        path: '/mobile/home',
        component: './Home',
        title: '主页'
      },
      {
        path: '/mobile/list-demo',
        component: './ListDemo',
        title: '列表'
      }
    ]
  }
];

export default routes;
