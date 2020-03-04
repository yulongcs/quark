import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/',
    exact: true,
    redirect: '/welcome',
  },
  {
    path: '/welcome',
    component: '@/page/Welcome',
    title: '欢迎',
  },
  {
    path: '/home',
    component: '@/page/Home',
    title: '主页',
  },
  {
    path: '/list-demo',
    title: '列表',
    component: '@/page/ListDemo',
  },
];

export default routes;
