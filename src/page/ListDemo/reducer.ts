import { combineReducers, Reducer } from 'redux';
import { getQuxUIStateReducer, getQuxListReducer } from '@/store';
import { PAGE_NAME } from './constant';
import { IPageState } from './type';

const uiReducer = getQuxUIStateReducer(PAGE_NAME);

const listReducer = getQuxListReducer(PAGE_NAME);

export default combineReducers({
  uiState: uiReducer,
  listState: listReducer,
}) as Reducer<IPageState>;
