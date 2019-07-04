import { AnyAction } from 'redux';
import { SET_APP_BASIC_STATE } from './constant';
import { IAppBasicReducer } from '../types';

const INITIAL_APP_STATE = {
  route: '/',
  title: 'quark',
  showTabBar: true
};

export default (state: IAppBasicReducer = INITIAL_APP_STATE, action: AnyAction) => {
  switch (action.type) {
    case SET_APP_BASIC_STATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
