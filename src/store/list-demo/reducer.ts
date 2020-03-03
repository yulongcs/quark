import { combineReducers, Reducer } from 'redux';
import { getQuxUIStateReducer, getQuxListReducer } from '../base';
import { ID } from './constant';
import { IPageState } from './type';

const uiReducer = getQuxUIStateReducer(ID);

const listReducer = getQuxListReducer(ID);

export default combineReducers({
  uiState: uiReducer,
  listState: listReducer,
}) as Reducer<IPageState>;
