import { IAppRouteState } from './type';
import { SET_APP_META_STATE } from './constant';

export const setAppRouteState = (state: Partial<IAppRouteState>) => ({
  type: SET_APP_META_STATE,
  payload: state,
});
