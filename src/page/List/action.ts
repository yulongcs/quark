import { Dispatch } from 'redux';
import { loadListApi } from './api';
import { IRootReducer } from '../App/type';
import { LOAD_ACTION_ENUM } from '../../types';
import {
  LOAD_LIST_SUCCESS, LOAD_PAGE_REQUEST, LOAD_PAGE_FAIL, LOAD_PAGE_SUCCESS
} from './constant';
import { handleRequestError } from '../../utils';

export const loadListAction = (action: LOAD_ACTION_ENUM = LOAD_ACTION_ENUM.LOADMORE) => async (dispatch: Dispatch, getState: any) => {
  const { listPageReducer: { listInfo: { pageNum, pageSize } } } = getState() as IRootReducer;
  try {
    const data = await loadListApi({ _page: pageNum, _limit: pageSize });
    dispatch({
      type: LOAD_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    if (action === LOAD_ACTION_ENUM.LOADMORE) {
      handleRequestError({ error, logTitle: '[LIST] load list action error', showMessage: false });
    } else {
      throw error;
    }
  }
};

export const initAction = () => async (dispatch: Dispatch<any>) => {
  dispatch({ type: LOAD_PAGE_REQUEST });
  try {
    await dispatch(loadListAction(LOAD_ACTION_ENUM.RESET));
    dispatch({ type: LOAD_PAGE_SUCCESS });
  } catch (error) {
    dispatch({ type: LOAD_PAGE_FAIL });
    handleRequestError({ error, logTitle: '[LIST] init action error' });
  }
};
