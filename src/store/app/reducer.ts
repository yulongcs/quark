import { AnyAction, combineReducers, Reducer } from 'redux';
import { produce } from 'immer';
import { IAppRouteState, IAppState } from './type';
import { SET_APP_META_STATE } from './constant';

const INITIAL_APP_META_STATE = {
  path: '/',
};

const routeStateReducer = (state: IAppRouteState = INITIAL_APP_META_STATE, action: AnyAction) =>
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
  routeState: routeStateReducer,
}) as Reducer<IAppState>;
