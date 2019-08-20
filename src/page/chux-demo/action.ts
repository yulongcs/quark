import { store } from './store';
import { CHANGE_VALUE } from './constant';

export const changeValueAction = () => {
  const { dispatch, getState } = store;
  dispatch({ type: CHANGE_VALUE });
  console.log('getState', getState());
};
