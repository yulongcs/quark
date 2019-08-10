import React from 'react';
import styled from 'styled-components/macro';
import { Carousel } from 'antd-mobile';
import { StyledCenter } from '../../component';
import { ROUTE_WITH_TAB_BAR_HEIGHT } from '../../constant';
import {
  pxToRem, urlRegx, goPage, jumpExternalUrl, uuidGen
} from '../../util';

const data = [
  {
    key: '0', text: 'Github', link: 'https://github.com/vdfor/quark', bgColor: '#1b86d4'
  },
  {
    key: '1', text: '页面 · 运行报告', link: '/report/nav', bgColor: '#f44e26'
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

export default () => (
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
      关于quark的介绍
    </QuarkIntroView>
  </WrapperView>
);
