import { AnyAction, combineReducers, Reducer } from 'redux';
import { produce } from 'immer';
import { SectionStateEnum } from '@vdfor/util';
import { IAppRouteState, IAppState } from './type';
import { SET_APP_ROUTE_STATE } from './constant';

const routeStateReducer = (
  state: IAppRouteState = {
    path: '/',
    uiStatus: SectionStateEnum.LOADING,
  },
  action: AnyAction,
) =>
  produce(state, draft => {
    const { type, payload } = action;
    switch (type) {
      case SET_APP_ROUTE_STATE:
        Object.assign(draft, payload);
        break;
      default:
        Object.assign(draft, {});
    }
  });

export default combineReducers({
  routeState: routeStateReducer,
}) as Reducer<IAppState>;
