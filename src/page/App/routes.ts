import {
  tarBarHomeImg, tarBarHomeSelectedImg, tarBarListImg, tarBarListSelectedImg
} from '../../assets/images';

export default [
  {
    key: '0',
    path: '/home',
    title: '首页',
    tarBarTitle: '首页',
    showTabBar: true,
    component: () => import('../Home'),
    icon: tarBarHomeImg,
    selectedIcon: tarBarHomeSelectedImg
  },
  {
    key: '1',
    path: '/list',
    title: '长列表',
    tarBarTitle: '长列表',
    showTabBar: true,
    component: () => import('../List'),
    icon: tarBarListImg,
    selectedIcon: tarBarListSelectedImg
  }
];
