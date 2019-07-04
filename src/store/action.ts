import { Dispatch } from 'redux';
import { SET_APP_BASIC_STATE } from './constant';
import { IAppBasicStateProps } from '../types';

export const setAppBasicStateAction = (state: Partial<IAppBasicStateProps>) => (dispatch: Dispatch) => {
  dispatch({ type: SET_APP_BASIC_STATE, payload: state });
};
