import { combineReducers, Reducer } from 'redux';
import { IRootReducer } from './type';
import { appBasicReducer } from '../../store';

export default combineReducers({
  appBasicReducer
}) as Reducer<IRootReducer>;
