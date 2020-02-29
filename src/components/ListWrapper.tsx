import React, { PropsWithChildren, CSSProperties } from 'react';
import { SkeletonList } from '@vdfor/react-component';
import styled from 'styled-components/macro';
import { SectionStateEnum, pxTransform } from '@vdfor/util';
import { StyledCenter, SectionStateComponent } from '.';

interface IListWrapperProps extends PropsWithChildren<any> {
  uiStatus?: SectionStateEnum;
  style?: CSSProperties;
}

const WrapperView = styled.div`
  padding: ${pxTransform(8)} ${pxTransform(16)} ${pxTransform(16)};
`;

const SectionStateWrapper = styled(StyledCenter)`
  height: 100%;
`;

export default ({
  uiStatus = SectionStateEnum.LOADING,
  style = {},
  children,
}: IListWrapperProps) => (
  <WrapperView style={style}>
    {(uiStatus === SectionStateEnum.LOADING && <SkeletonList />)
      || (uiStatus === SectionStateEnum.CONTENT ? (
        children
      ) : (
        <SectionStateWrapper>
          <SectionStateComponent
            type={uiStatus === SectionStateEnum.ERROR ? 'error' : 'empty'}
          />
        </SectionStateWrapper>
      ))}
  </WrapperView>
);
