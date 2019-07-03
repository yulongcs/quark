import { combineReducers, AnyAction, Reducer } from 'redux';
import { SET_APP_STATE } from './constant';
import { IRootReducer } from './type';
import homeReducer from '../Home/reducer';
import listPageReducer from '../List/reducer';

const INITIAL_APP_STATE = {
  route: '/'
};

const appReducer = (state = INITIAL_APP_STATE, action: AnyAction) => {
  switch (action.type) {
    case SET_APP_STATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  appReducer,
  homeReducer,
  listPageReducer
}) as Reducer<IRootReducer>;
