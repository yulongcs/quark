import { AnyAction, combineReducers, Reducer } from 'redux';
import { produce } from 'immer';
import { IRootReducer } from '@/types';
import { PAGE_REDUCER_NAME as DEMO_LIST_PAGE_REDUCER_NAME } from '@/pages/demo/list/constants';
import demoListPageReducer from '@/pages/demo/list/reducers';
import { IAppMetaState, IAppState } from './types';
import { SET_APP_META_STATE, APP_REDUCER_NAME } from './constants';

const INITIAL_APP_META_STATE = {
  route: '/',
};

const metaStateReducer = (state: IAppMetaState = INITIAL_APP_META_STATE, action: AnyAction) => produce(state, (draft) => {
  const { type, payload } = action;
  switch (type) {
    case SET_APP_META_STATE:
      Object.assign(draft, payload);
      break;
    default:
      Object.assign(draft, {});
  }
});

const appReducer = combineReducers({
  metaState: metaStateReducer,
}) as Reducer<IAppState>;

export default combineReducers({
  [APP_REDUCER_NAME]: appReducer,
  [DEMO_LIST_PAGE_REDUCER_NAME]: demoListPageReducer,
}) as Reducer<IRootReducer>;
