import { combineReducers, Reducer } from 'redux';
import { IRootReducer } from './type';
import appBasicReducer from '../../store/reducer';
import listPageReducer from '../List/reducer';
import logReportPageReducer from '../report/LogReport/reducer';

export default combineReducers({
  appBasicReducer,
  listPageReducer,
  logReportPageReducer
}) as Reducer<IRootReducer>;
