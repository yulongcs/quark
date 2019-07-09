import { combineReducers, Reducer } from 'redux';
import {
  LOAD_LOG_REPORT_PAGE_LIST_REQUEST,
  LOAD_LOG_REPORT_PAGE_LIST_SUCCESS,
  LOAD_LOG_REPORT_PAGE_LIST_FAIL,
  REFRESH_LOG_REPORT_PAGE_LIST_REQUEST,
  REFRESH_LOG_REPORT_PAGE_LIST_SUCCESS,
  SET_LOG_REPORT_PAGE_PAGE_STATE
} from './constant';
import { getQuxPageStateReducer, getQuxListReducer } from '../../../quxs';
import { ILogReportPageProps } from './type';

const pageReducer = getQuxPageStateReducer({ SET_PAGE_STATE: SET_LOG_REPORT_PAGE_PAGE_STATE });

const listReducer = getQuxListReducer({
  LOAD_LIST_REQUEST: LOAD_LOG_REPORT_PAGE_LIST_REQUEST,
  LOAD_LIST_SUCCESS: LOAD_LOG_REPORT_PAGE_LIST_SUCCESS,
  LOAD_LIST_FAIL: LOAD_LOG_REPORT_PAGE_LIST_FAIL,
  REFRESH_LIST_REQUEST: REFRESH_LOG_REPORT_PAGE_LIST_REQUEST,
  REFRESH_LIST_SUCCESS: REFRESH_LOG_REPORT_PAGE_LIST_SUCCESS
});

export default combineReducers({
  pageInfo: pageReducer,
  listInfo: listReducer
}) as Reducer<ILogReportPageProps>;
