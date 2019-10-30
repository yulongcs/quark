import React, { memo, useState } from 'react';
import { Button } from 'antd-mobile';
import {
  Curtain, Spin, Skeleton, TabBar, Loadable,
} from '@vdfor/react-component';
import styled from 'styled-components/macro';
import { StyledCenter } from '../../component';
import { pxToRem } from '../../util';
import {
  tarBarHomeImg, tarBarHomeSelectedImg, tarBarListImg, tarBarListSelectedImg,
} from '../../asset/images';

const WrapperView = styled.div`
  padding: ${pxToRem(24)};
`;

const TitleView = styled.h1`
  margin: 0;
  font-weight: 500;
  text-align: center;
  padding-bottom: ${pxToRem(16)};
  border-bottom: 1px solid #ebedf0;
`;

const ListWrapperView = styled.ul`
  list-style: none;
  margin: ${pxToRem(20)} 0 0;
  padding: 0;
`;

const ItemWrapperView = styled.li`
  & + & {
    margin-top: ${pxToRem(30)};
  }
`;

const ItemNameView = styled.h2`
  margin: 0 0 ${pxToRem(24)};
  font-weight: 500;
  padding-left: ${pxToRem(24)};
`;

const ItemComponentView = styled(StyledCenter)`
  background: #fff;
  min-height: ${pxToRem(400)};
  padding: ${pxToRem(24)};
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: ${pxToRem(12)};
`;

const CurtainContentView = styled(StyledCenter)`
  padding: ${pxToRem(24)};
  flex-direction: column;
`;

const tabBarData = [
  {
    key: '0',
    title: '首页',
    icon: tarBarHomeImg,
    selectedIcon: tarBarHomeSelectedImg,
    selected: true,
  },
  {
    key: '1',
    title: '列表',
    icon: tarBarListImg,
    selectedIcon: tarBarListSelectedImg,
  },
];

const LazyComponent = Loadable({ component: () => import('./views/LazyComponent') });

export default memo(() => {
  const [curtainVisible, setCurtainVisible] = useState(false);

  const list = [
    { key: 0, name: 'Spin', component: <Spin /> },
    { key: 1, name: 'Skeleton', component: <Skeleton rows={5} /> },
    { key: 2, name: 'Curtain', component: <Button size="small" style={{ width: '50%' }} onClick={() => setCurtainVisible(true)} type="primary">Open Curtain</Button> },
    { key: 3, name: 'TabBar', component: <TabBar theme={{ barTintColor: '#ebedf0' }}>{tabBarData.map((i) => (<TabBar.Item {...i} />))}</TabBar> },
    { key: 4, name: 'Loadable', component: <LazyComponent /> },
  ];

  return (
    <>
      <WrapperView>
        <TitleView>rc-demo</TitleView>
        <ListWrapperView>
          {list.map(({ key, name, component }) => (
            <ItemWrapperView key={key}>
              <ItemNameView>{name}</ItemNameView>
              <ItemComponentView>{component}</ItemComponentView>
            </ItemWrapperView>
          ))}
        </ListWrapperView>
      </WrapperView>
      <Curtain visible={curtainVisible} onClose={() => setCurtainVisible(false)}>
        <CurtainContentView>
          <p>这是一个幕帘</p>
          <p>这是一个幕帘</p>
          <p>这是一个幕帘</p>
          <p>这是一个幕帘</p>
          <p>这是一个幕帘</p>
          <p>这是一个幕帘</p>
        </CurtainContentView>
      </Curtain>
    </>
  );
});
