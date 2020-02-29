import { Dispatch } from 'redux';
import { IAppMetaState } from './types';
import { SET_APP_META_STATE } from './constants';

export const setAppMetaStateAction = (state: Partial<IAppMetaState>) => (
  dispatch: Dispatch<any>
) => {
  dispatch({ type: SET_APP_META_STATE, payload: state });
};
