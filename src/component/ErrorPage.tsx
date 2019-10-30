import React from 'react';
import { Result } from 'antd-mobile';
import styled from 'styled-components/macro';
import { ResultProps } from 'antd-mobile/lib/result';
import { pageErrorImg } from '../asset';

const Wrapper = styled(Result)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  .am-result-pic {
    width: auto !important;
    height: auto !important;
    line-height: 1 !important;
    padding: 0 15px;
  }
`;

export default (props: ResultProps) => (
  <Wrapper
    img={<img style={{ maxWidth: '100%' }} alt="errorPage" src={pageErrorImg} />}
    title="Error"
    message="Sorry, Page Error"
    {...props}
  />
);
