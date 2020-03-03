import { AnyAction, combineReducers, Reducer } from 'redux';
import { produce } from 'immer';
import { IRootReducer } from '@/type';
import { LIST_DEMO_CONSTANTS, listDemoPageReducer } from '@/page';
import { IAppMetaState, IAppState } from './type';
import { SET_APP_META_STATE, APP_REDUCER_NAME } from './constant';

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

const appReducer = combineReducers({
  metaState: metaStateReducer,
}) as Reducer<IAppState>;

export default combineReducers({
  [APP_REDUCER_NAME]: appReducer,
  [LIST_DEMO_CONSTANTS.PAGE_REDUCER_NAME]: listDemoPageReducer,
}) as Reducer<IRootReducer>;
