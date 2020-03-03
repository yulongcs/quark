import { IAppMetaState } from './type';
import { SET_APP_META_STATE } from './constant';

export const setAppMetaState = (state: Partial<IAppMetaState>) => ({
  type: SET_APP_META_STATE,
  payload: state,
});
