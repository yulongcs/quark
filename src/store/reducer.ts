import { AnyAction, combineReducers, Reducer } from 'redux';
import { SET_APP_BASIC_STATE } from './constant';
import { IAppBasicStateProps, IAppBasicProps } from '../type';

const INITIAL_APP_STATE = {
  route: '/',
  title: 'quark',
  showTabBar: true
};

const basicStateReducer = (state: IAppBasicStateProps = INITIAL_APP_STATE, action: AnyAction) => {
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

export default combineReducers({
  basicState: basicStateReducer
}) as Reducer<IAppBasicProps>;
