import React from 'react';
import dayjs from 'dayjs';
import { Card } from 'antd-mobile';
import styled from 'styled-components/macro';
import { pxToRem } from '../../../../utils';
import { IListItemData } from '../type';

const WrapperView = styled.div`
  width: 100%;
  padding: ${pxToRem(12)} ${pxToRem(30)};

  .am-card-body {
    padding: ${pxToRem(30)};
  }
`;

const CardView = styled(Card)`
  box-shadow: 0 ${pxToRem(10)}  ${pxToRem(14)} 0 rgba(0, 0, 0, 0.04);
  border-radius: ${pxToRem(16)} !important;
  ::before {
    border: none !important;
  }
`;

const CardHeaderExtraView = styled.div`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DescView = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export default React.memo(({
  title, desc, createAt, page
}: IListItemData) => (
  <WrapperView>
    <CardView>
      <Card.Header
        title={page}
        extra={<CardHeaderExtraView>{title}</CardHeaderExtraView>}
      />
      <Card.Body><DescView>{desc}</DescView></Card.Body>
      <Card.Footer extra={dayjs(createAt).format('YYYY-MM-DD HH:mm:ss')} />
    </CardView>
  </WrapperView>
));
