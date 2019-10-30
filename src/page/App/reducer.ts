import { combineReducers, Reducer } from 'redux';
import { IRootReducer } from './type';
import { appBasicReducer } from '../../store';
import { listPageReducer, PAGE_REDUCER_NAME as LIST_PAGE_REDUCER_NAME } from '../list';
import { logReportPageReducer, PAGE_REDUCER_NAME as LOG_REPORT_PAGE_REDUCER_NAME } from '../report/log-report';

export default combineReducers({
  appBasicReducer,
  [LIST_PAGE_REDUCER_NAME]: listPageReducer,
  [LOG_REPORT_PAGE_REDUCER_NAME]: logReportPageReducer,
}) as Reducer<IRootReducer>;
