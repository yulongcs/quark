import { SectionStateEnum } from '@vdfor/util';

export interface IAppRouteState {
  path: string;
  uiStatus: SectionStateEnum;
}

export interface IAppState {
  routeState: IAppRouteState;
}
