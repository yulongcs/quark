import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { pxToRem } from '../../../../util';

interface IProps {
  label: string;
  value: string | number;
  style?: React.CSSProperties;
}

const Wrapper = styled.div`
  width: 100%;
  font-size: ${pxToRem(30)};
  line-height: 1.4;
  color: #4a4a4a;
  padding: ${pxToRem(24)} 0;
  border-bottom: 1px solid #f2f2f2;
`;

const Value = styled.div`
  margin-top: ${pxToRem(12)};
  color: #9b9b9b;
  margin-left: ${pxToRem(12)};
`;

export default memo(({ label, value, style = {} }: IProps) => (
  <Wrapper style={style}>
    {label}
    <Value>{value}</Value>
  </Wrapper>
));
