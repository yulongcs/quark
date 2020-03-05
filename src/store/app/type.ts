import { SectionStateEnum } from '@vdfor/util';

export interface IAppRouteState {
  path: string;
  id?: string; // 当前路由页面ID标识
  uiStatus: SectionStateEnum;
}

export interface IAppState {
  routeState: IAppRouteState;
}
