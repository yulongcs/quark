import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { StyledCenter } from '../../../component';

const WrapperView = styled(StyledCenter)`
  color: #fff;
  background: #1b86d4;
  width: 80%;
  height: 120px;
  padding: 8px;
`;

export default memo(() => (
  <WrapperView>
    这个组件是通过 Loadable 实现的懒加载
  </WrapperView>
));
