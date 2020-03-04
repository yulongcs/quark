import { combineReducers, Reducer } from 'redux';
import { getQuxListReducer } from '../base';
import { ID } from './constant';
import { IPageState } from './type';

const listReducer = getQuxListReducer(ID);

export default combineReducers({
  listState: listReducer,
}) as Reducer<IPageState>;
