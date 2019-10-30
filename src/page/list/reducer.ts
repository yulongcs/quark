import { combineReducers, Reducer } from 'redux';
import {
  LOAD_LIST_PAGE_LIST_REQUEST,
  LOAD_LIST_PAGE_LIST_SUCCESS,
  LOAD_LIST_PAGE_LIST_FAIL,
  REFRESH_LIST_PAGE_LIST_REQUEST,
  REFRESH_LIST_PAGE_LIST_SUCCESS,
  SET_LIST_PAGE_PAGE_STATE,
  RESET_LIST_PAGE_LIST,
} from './constant';
import { getQuxPageStateReducer, getQuxListReducer } from '../../qux';
import { IListPageProps } from './type';

const pageReducer = getQuxPageStateReducer({ SET_PAGE_STATE: SET_LIST_PAGE_PAGE_STATE });

const listReducer = getQuxListReducer({
  LOAD_LIST_REQUEST: LOAD_LIST_PAGE_LIST_REQUEST,
  LOAD_LIST_SUCCESS: LOAD_LIST_PAGE_LIST_SUCCESS,
  LOAD_LIST_FAIL: LOAD_LIST_PAGE_LIST_FAIL,
  REFRESH_LIST_REQUEST: REFRESH_LIST_PAGE_LIST_REQUEST,
  REFRESH_LIST_SUCCESS: REFRESH_LIST_PAGE_LIST_SUCCESS,
  RESET_LIST: RESET_LIST_PAGE_LIST,
});

export default combineReducers({
  pageInfo: pageReducer,
  listInfo: listReducer,
}) as Reducer<IListPageProps>;
