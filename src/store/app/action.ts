import { IAppRouteState } from './type';
import { SET_APP_ROUTE_STATE } from './constant';

export const setAppRouteState = (state: Partial<IAppRouteState>) => ({
  type: SET_APP_ROUTE_STATE,
  payload: state,
});
