import { combineReducers, Reducer } from 'redux';
import { IRootReducer } from './type';
import { appBasicReducer } from '../../store';
import { listPageReducer } from '../list';
import { logReportPageReducer } from '../report/log-report';

export default combineReducers({
  appBasicReducer,
  listPageReducer,
  logReportPageReducer
}) as Reducer<IRootReducer>;
