// eslint-disable-next-line
import { IRoute } from 'umi-types';

const routes: IRoute[] = [
  {
    path: '/',
    exact: true,
    redirect: '/welcome',
  },
  {
    path: '/welcome',
    component: './welcome',
    title: '欢迎',
  },
  {
    path: '/index',
    component: './index',
    title: '主页',
  },
  {
    path: '/demo-list',
    component: './demo/list',
    title: '列表',
  },
];

export default routes;
