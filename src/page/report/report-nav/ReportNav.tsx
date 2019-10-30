import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { pxToRem, goPage } from '../../../util';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: ${pxToRem(32)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 80%;
  min-height: ${pxToRem(100)};
  font-size: ${pxToRem(30)};
  line-height: 1.4;
  box-shadow: 0 ${pxToRem(10)} ${pxToRem(14)} 0 rgba(0,0,0,.04);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${pxToRem(16)};
  color: #4a4a4a;
  margin-bottom: ${pxToRem(48)};
`;

const data = [
  { key: '0', path: '/report/env', label: '运行环境' },
  { key: '1', path: '/report/log', label: '运行日志' },
];

const len = data.length;

export default memo(() => (
  <Wrapper>
    {data.map(({ key, path, label }, index) => <Card style={index === len - 1 ? { marginBottom: 0 } : {}} onClick={() => { goPage(path); }} key={key}>{label}</Card>)}
  </Wrapper>
));
