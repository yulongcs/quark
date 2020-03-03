import { AnyAction, combineReducers, Reducer } from 'redux';
import { produce } from 'immer';
import { LIST_DEMO_CONSTANT, listDemoPageReducer } from '@/page';
import { IAppMetaState, IAppState, IRootReducer, ROOT_CONSTANT } from '.';

const INITIAL_APP_META_STATE = {
  route: '/',
};

const metaStateReducer = (state: IAppMetaState = INITIAL_APP_META_STATE, action: AnyAction) =>
  produce(state, draft => {
    const { type, payload } = action;
    switch (type) {
      case ROOT_CONSTANT.SET_APP_META_STATE:
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
  [ROOT_CONSTANT.APP_REDUCER_NAME]: appReducer,
  [LIST_DEMO_CONSTANT.PAGE_REDUCER_NAME]: listDemoPageReducer,
}) as Reducer<IRootReducer>;
