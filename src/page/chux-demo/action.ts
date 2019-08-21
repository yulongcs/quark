import { store } from './store';
import { CHANGE_VALUE } from './constant';

export const changeValueAction = () => {
  const { dispatch } = store;
  dispatch({ type: CHANGE_VALUE });
};
