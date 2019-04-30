import * as _ from 'lodash';
import { SET_ALIVE_DATA, REMOVE_ALIVE_DATA } from './constant';

export interface IAliveDataValue {
  scrollTop: number;
  data: any;
}

interface IActionPrams {
  type: string;
  aliveData: {
    key: string;
    value: IAliveDataValue;
  };
}

export default (state: any, action: IActionPrams) => {
  switch (action.type) {
    case SET_ALIVE_DATA: {
      const { key, value } = action.aliveData;
      return { ...state, [key]: value };
    }
    case REMOVE_ALIVE_DATA: {
      const { key } = action.aliveData;
      return { state: _.omit(state, key) };
    }
    default:
      return { ...state };
  }
};
