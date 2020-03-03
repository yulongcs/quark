import { AnyAction, combineReducers, Reducer } from 'redux';
import { produce } from 'immer';
import { IAppMetaState, IAppState } from './type';
import { SET_APP_META_STATE } from './constant';

const INITIAL_APP_META_STATE = {
  route: '/',
};

const metaStateReducer = (state: IAppMetaState = INITIAL_APP_META_STATE, action: AnyAction) =>
  produce(state, draft => {
    const { type, payload } = action;
    switch (type) {
      case SET_APP_META_STATE:
        Object.assign(draft, payload);
        break;
      default:
        Object.assign(draft, {});
    }
  });

export default combineReducers({
  metaState: metaStateReducer,
}) as Reducer<IAppState>;
