import { Dispatch } from 'redux';
import { LOAD_DATA_REQUEST } from './constant';

export const loadData = () => (dispatch: Dispatch) => {
  dispatch({ type: LOAD_DATA_REQUEST });
};
