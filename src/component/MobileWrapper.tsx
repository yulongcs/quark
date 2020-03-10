import React, { PropsWithChildren } from 'react';
import { Spin } from '@vdfor/react-component';
import { SectionStateEnum } from '@vdfor/util';
import { SectionStateComponent } from '.';

interface IMobileWrapperProps extends PropsWithChildren<any> {
  uiStatus?: SectionStateEnum;
}

export default ({ uiStatus = SectionStateEnum.LOADING, children }: IMobileWrapperProps) => (
  <>
    {(uiStatus === SectionStateEnum.LOADING && <Spin />) ||
      (uiStatus === SectionStateEnum.ERROR ? <SectionStateComponent style={{ width: '100vw', height: '100vh' }} type="error" /> : children)}
  </>
);
