import { combineReducers, Reducer } from 'redux';
import { getQuxUIStateReducer, getQuxListReducer } from '@/quxs';
import { PAGE_NAME } from './constants';
import { IPageState } from './types';

const uiReducer = getQuxUIStateReducer(PAGE_NAME);

const listReducer = getQuxListReducer(PAGE_NAME);

export default combineReducers({
  uiState: uiReducer,
  listState: listReducer
}) as Reducer<IPageState>;
