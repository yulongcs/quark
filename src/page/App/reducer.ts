import { combineReducers, Reducer } from 'redux';
import { IRootReducer } from './type';
import appBasicReducer from '../../store/reducer';
import homeReducer from '../Home/reducer';
import listPageReducer from '../List/reducer';

export default combineReducers({
  appBasicReducer,
  homeReducer,
  listPageReducer
}) as Reducer<IRootReducer>;
