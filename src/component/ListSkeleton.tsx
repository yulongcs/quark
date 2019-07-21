import React, { memo } from 'react';
import { Skeleton } from '@vdfor/react-component';
import styled from 'styled-components/macro';
import { uuidGen, pxToRem } from '../util';

interface IProps {
  rows?: number;
}

const SkeletonWrapperView = styled.div`
  background: #ffffff;
  padding: 0 ${pxToRem(32)} ${pxToRem(32)};
  margin-bottom: ${pxToRem(16)};
`;

export default memo(({ rows = 5 }: IProps = {}) => {
  const listArr = [...Array(rows)];
  return (
    <div>
      {listArr.map(() => <SkeletonWrapperView key={uuidGen()}><Skeleton /></SkeletonWrapperView>)}
    </div>
  );
});
