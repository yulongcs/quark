import { Dispatch } from 'redux';
import { SET_ROUTE } from './constant';

export const setRouteAction = (route: string) => (dispatch: Dispatch) => {
  dispatch({ type: SET_ROUTE, payload: route });
};
