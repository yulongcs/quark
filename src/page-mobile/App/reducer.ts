import * as _ from 'lodash';
import { SET_ALIVE_DATA, REMOVE_ALIVE_DATA } from './constant';
import { IState, IAction } from './type';

// const initState = {};

export default (state: IState, action: IAction) => {
  switch (action.type) {
    case SET_ALIVE_DATA: {
      const { key, value } = action.aliveData;
      return { ...state, aliveData: { ...state.aliveData, [key]: value } };
    }
    case REMOVE_ALIVE_DATA: {
      const { key } = action.aliveData;
      return { ...state, aliveData: _.omit(state.aliveData, key) };
    }
    default:
      return { ...state };
  }
};
