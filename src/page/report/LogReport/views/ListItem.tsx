import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components/macro';
import { pxToRem } from '../../../../utils';
import { IListItemData } from '../type';

const Wrapper = styled.div`
  /* width: 100%; */
  /* border-bottom: 1pX solid #e8e8e8; */
  padding: ${pxToRem(12)} ${pxToRem(30)};
  margin-bottom: ${pxToRem(16)};
  line-height: 1.5;
`;

export default React.memo(({
  title, desc, createAt, page
}: IListItemData) => (
  <Wrapper>
    {`『${dayjs(createAt).format('YYYY-MM-DD HH:mm:ss')}』 [${page} - ${title}] ${desc}`}
  </Wrapper>
));
