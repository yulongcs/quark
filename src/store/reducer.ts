import { AnyAction, combineReducers, Reducer } from 'redux';
import { SET_APP_BASIC_STATE, SET_ENV_INFO } from './constant';
import { IAppBasicStateProps, IEnvProps, IAppBasicProps } from '../types';
import { md } from '../utils';

const INITIAL_ENV_INFO = {
  nodeEnv: process.env.NODE_ENV,
  projectVersion: process.env.REACT_APP_VERSION || 'unknown',
  projectName: process.env.REACT_APP_NAME || 'unknown',
  device: `${md.mobile()}-${md.phone()}`,
  os: md.os(),
  browser: `${md.userAgent()}${md.version(md.userAgent())}`
};

const INITIAL_APP_STATE = {
  route: '/',
  title: 'quark',
  showTabBar: true
};

const envInfoReducer = (state: IEnvProps = INITIAL_ENV_INFO, action: AnyAction) => {
  switch (action.type) {
    case SET_ENV_INFO:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
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
  envInfo: envInfoReducer,
  basicState: basicStateReducer
}) as Reducer<IAppBasicProps>;
