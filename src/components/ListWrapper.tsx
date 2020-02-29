import React, { PropsWithChildren } from 'react';
import { SkeletonList } from '@vdfor/react-component';
import styled from 'styled-components/macro';
import { SectionStateEnum, pxTransform } from '@vdfor/util';
import { StyledCenter, SectionStateComponent } from '.';

interface IListWrapperProps extends PropsWithChildren<any> {
  listStatus?: SectionStateEnum;
}

const WrapperView = styled.div`
  min-height: calc(100vh - ${pxTransform(45)});
  padding: ${pxTransform(8)} ${pxTransform(16)} ${pxTransform(16)};
`;

const SectionStateWrapper = styled(StyledCenter)`
  min-height: calc(100vh - ${pxTransform(45)});
`;

export default ({
  listStatus = SectionStateEnum.LOADING,
  children,
}: IListWrapperProps) => (
  <WrapperView>
    {(listStatus === SectionStateEnum.LOADING && <SkeletonList />)
      || (listStatus === SectionStateEnum.CONTENT ? (
        children
      ) : (
        <SectionStateWrapper>
          <SectionStateComponent
            type={listStatus === SectionStateEnum.ERROR ? 'error' : 'empty'}
          />
        </SectionStateWrapper>
      ))}
  </WrapperView>
);
