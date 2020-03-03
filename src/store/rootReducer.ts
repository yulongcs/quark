import { combineReducers, Reducer } from 'redux';
import { appReducer } from './app';
import { LIST_DEMO_CONSTANT, listDemoReducer } from './list-demo';
import { IRootReducer } from './type';

export default combineReducers({
  app: appReducer,
  [LIST_DEMO_CONSTANT.ID]: listDemoReducer,
}) as Reducer<IRootReducer>;
