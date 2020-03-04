import { combineReducers, Reducer } from 'redux';
import { appReducer, APP_CONSTANT } from './app';
import { LIST_DEMO_CONSTANT, listDemoReducer } from './list-demo';
import { IRootReducer } from './type';

export default combineReducers({
  [APP_CONSTANT.ID]: appReducer,
  [LIST_DEMO_CONSTANT.ID]: listDemoReducer,
}) as Reducer<IRootReducer>;
