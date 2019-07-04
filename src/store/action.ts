import { Dispatch } from 'redux';
import { SET_APP_BASIC_STATE } from './constant';
import { IAppBasicReducer } from '../types';

export const setAppBasicStateAction = (state: Partial<IAppBasicReducer>) => (dispatch: Dispatch) => {
  dispatch({ type: SET_APP_BASIC_STATE, payload: state });
};
