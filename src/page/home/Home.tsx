import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { Carousel } from 'antd-mobile';
import { StyledCenter } from '../../component';
import { ROUTE_WITH_TAB_BAR_HEIGHT } from '../../constant';
import {
  pxToRem, urlRegx, goPage, jumpExternalUrl
} from '../../util';

const data = [
  {
    key: '0', text: 'quark · Github', link: 'https://github.com/vdfor/quark', bgColor: '#1b86d4'
  },
  {
    key: '1', text: '页面 · 运行报告', link: '/report/nav', bgColor: '#f44e26'
  },
  {
    key: '2', text: 'CHUX DEMO', link: '/chux-demo', bgColor: '#1890ff'
  },
  {
    key: '3', text: 'DEMO For @vdfor/react-component', link: '/rc-demo', bgColor: '#2f54eb'
  }
];

const WrapperView = styled.div`
  width: 100%;
  height: ${ROUTE_WITH_TAB_BAR_HEIGHT};
`;

const CarouselView = styled(Carousel)`
  overflow: hidden;
`;

const CarouselItemView = styled(StyledCenter)`
  width: 100%;
  height: ${pxToRem(300)};
  color: #fff;
`;

const QuarkIntroView = styled.p`
  height: ${`calc(${ROUTE_WITH_TAB_BAR_HEIGHT} - ${pxToRem(300)})`};
  line-height: 1.5;
  padding: ${pxToRem(32)};
  overflow: auto;
`;

const onCarouselItemClick = (link: string) => () => {
  if (urlRegx.test(link)) {
    jumpExternalUrl(link);
    return;
  }
  goPage(link);
};

export default memo(() => (
  <WrapperView>
    <CarouselView
      autoplay
      infinite
    >
      {data.map(({
        key, text, link, bgColor
      }) => <CarouselItemView onClick={onCarouselItemClick(link)} style={{ backgroundColor: bgColor }} key={key}>{text}</CarouselItemView>)}
    </CarouselView>
    <QuarkIntroView>
      quark, 原意为构成物质的基本单元。在这里，我们理解为基石，本项目以此命名，是希望能够帮助快速构建移动web开发。
    </QuarkIntroView>
  </WrapperView>
));
