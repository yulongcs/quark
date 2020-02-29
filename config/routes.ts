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
    path: '/home',
    component: './home',
    title: '主页',
  },
  {
    path: '/list-demo',
    component: './list-demo',
    title: '列表',
  },
];

export default routes;
