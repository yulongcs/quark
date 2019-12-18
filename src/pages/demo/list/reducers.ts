import { combineReducers, Reducer } from 'redux';
import { getQuxUIStateReducer } from '@/quxs';
import { getQuxListReducer } from '@/quxs/env-h5';
import { PAGE_NAME } from './constants';
import { IPageState } from './types';

const uiReducer = getQuxUIStateReducer(PAGE_NAME);

const listReducer = getQuxListReducer(PAGE_NAME);

export default combineReducers({
  uiState: uiReducer,
  listState: listReducer,
}) as Reducer<IPageState>;
