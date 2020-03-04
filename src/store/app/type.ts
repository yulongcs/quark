import { SectionStateEnum } from '@vdfor/util';
import { IQuxUIState } from '../base';

export interface IAppRouteState {
  path: string;
  uiStatus: SectionStateEnum;
}

export interface IAppState {
  uiState: IQuxUIState;
  routeState: IAppRouteState;
}
