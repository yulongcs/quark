import { Dispatch } from 'redux';
import { LOAD_DATA_REQUEST } from './constant';

const loadData = () => (dispatch: Dispatch) => {
  dispatch({ type: LOAD_DATA_REQUEST });
};

export const initAction = () => (dispatch: Dispatch<any>) => {
  dispatch(loadData());
};
