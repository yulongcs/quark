import {
  tarBarHomeImg, tarBarHomeSelectedImg, tarBarListImg, tarBarListSelectedImg
} from '../../assets/images';

export default [
  {
    key: '0',
    path: '/home',
    title: '首页',
    tabBarTitle: '首页',
    showTabBar: true,
    component: () => import('../Home'),
    icon: tarBarHomeImg,
    selectedIcon: tarBarHomeSelectedImg
  },
  {
    key: '1',
    path: '/list',
    title: '长列表',
    tabBarTitle: '列表',
    showTabBar: true,
    component: () => import('../List'),
    icon: tarBarListImg,
    selectedIcon: tarBarListSelectedImg
  },
  {
    key: '2',
    path: '/list-detail/:id',
    title: '列表详情',
    tabBarTitle: '列表详情',
    showTabBar: false,
    component: () => import('../ListDetail'),
    icon: tarBarListImg,
    selectedIcon: tarBarListSelectedImg
  }
];
