import { Dispatch } from 'redux';
import { SET_APP_STATE } from './constant';
import { IAppReducer } from './type';

export const setAppStateAction = (props: Partial<IAppReducer>) => (dispatch: Dispatch) => {
  dispatch({ type: SET_APP_STATE, payload: props });
};
