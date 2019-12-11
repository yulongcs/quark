import React, { FC } from 'react';
import {
  Skeleton, TabBar, Spin, SkeletonList,
} from '@vdfor/react-component';
import {
  tabbarHomeImg, tabbarHomeSelectedImg, tabbarAboutImg, tabbarAboutSelectedImg, tabbarDemoImg, tabbarDemoSelectedImg,
} from 'src/assets';

const data = [
  {
    key: '0',
    title: '首页',
    icon: tabbarHomeImg,
    selectedIcon: tabbarHomeSelectedImg,
    selected: true,
  },
  {
    key: '1',
    title: '演示',
    icon: tabbarDemoImg,
    selectedIcon: tabbarDemoSelectedImg,
  },
  {
    key: '2',
    title: '关于',
    icon: tabbarAboutImg,
    selectedIcon: tabbarAboutSelectedImg,
  },
];

const Index: FC = () => (
  <>
    <h1>Hello</h1>
    <Skeleton avatar />
    <TabBar>{data.map((i) => (<TabBar.Item {...i} />))}</TabBar>
    <Spin />
    <SkeletonList />
  </>
);

export default Index;
