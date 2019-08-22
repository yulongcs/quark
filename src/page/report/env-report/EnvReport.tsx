import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { ListItem } from './views';
import { pxToRem, getEnv } from '../../../util';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  width: ${pxToRem(120)};
  height: ${pxToRem(120)};
  border-radius: 50%;
  background: #e6e6e6;
  color: #888;
  font-size: ${pxToRem(36)};
  margin-bottom: ${pxToRem(32)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Section = styled.section`
  width: 85%;
  padding: ${pxToRem(24)};
  box-shadow: 0 ${pxToRem(10)} ${pxToRem(14)} 0 rgba(0,0,0,.04);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: ${pxToRem(16)};
`;

const envInfo = getEnv();
const envInfoArr = [
  { key: '0', label: '项目名称', value: envInfo.projectName },
  { key: '1', label: '项目版本', value: envInfo.projectVersion },
  { key: '2', label: 'NODE_ENV', value: envInfo.nodeEnv },
  { key: '3', label: '运行设备', value: envInfo.device },
  { key: '4', label: '操作系统', value: envInfo.os },
  { key: '5', label: '浏览器', value: envInfo.browser }
];

const len = envInfoArr.length;

export default memo(() => (
  <Wrapper>
    <Header>ENV</Header>
    <Section>
      {envInfoArr.map((i, index) => <ListItem {...i} style={index === len - 1 ? { borderBottom: 'none' } : {}} />)}
    </Section>
  </Wrapper>
));
