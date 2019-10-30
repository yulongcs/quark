import React, { memo } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components/macro';
import { IListItemData } from '../type';
import { goPage, pxToRem } from '../../../util';

const WrapperView = styled.div`
  width: 100%;
  background: #ffffff;
  padding: ${pxToRem(12)} ${pxToRem(30)};
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: ${pxToRem(16)};
  line-height: 1.5;
`;

const HeaderView = styled.div`
  color: rgba(0, 0, 0, 0.65);
  transition: all .3s;
  font-weight: 500;
  font-size: ${pxToRem(32)};
`;

const DescView = styled.div`
  color: rgba(0, 0, 0, 0.45);
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: ${pxToRem(16)};
  font-size: ${pxToRem(28)};
`;

const FooterView = styled.div`
  margin-top: ${pxToRem(16)};
  color: #888888;
  display: flex;
  font-size: ${pxToRem(28)};
`;

export default memo(({
  id, title, desc, time,
}: IListItemData) => (
  <WrapperView onClick={() => goPage(`/list-detail/${id}`)}>
    <HeaderView>{title}</HeaderView>
    <DescView>{desc}</DescView>
    <FooterView>{dayjs(time).format('YYYY-MM-DD HH:mm')}</FooterView>
  </WrapperView>
));
