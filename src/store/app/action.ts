import { IAppRouteState } from './type';
import { SET_APP_ROUTE_STATE, ID } from './constant';
import { getQuxUIStateSetStatusAction } from '../base';

export const setUIState = getQuxUIStateSetStatusAction(ID);

export const setAppRouteState = (state: Partial<IAppRouteState>) => ({
  type: SET_APP_ROUTE_STATE,
  payload: state,
});
