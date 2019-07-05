import { Dispatch } from 'redux';
import { loadListApi } from './api';
import { IRootReducer } from '../App/type';
import { LOAD_ACTION_ENUM, PAGE_STATUS_ENUM } from '../../types';
import { IPageInfoProps } from './type';
import {
  PAGE_NAME, LOAD_LIST_SUCCESS, LOAD_LIST_REQUEST, SET_PAGE_STATE, REFRESH_LIST_REQUEST, REFRESH_LIST_SUCCESS
} from './constant';
import { handleRequestError } from '../../utils';

export const setPageStateAction = (payload: Partial<IPageInfoProps> = {}) => (dispatch: Dispatch<any>) => {
  dispatch({ type: SET_PAGE_STATE, payload });
};

export const loadListAction = (action: LOAD_ACTION_ENUM = LOAD_ACTION_ENUM.LOADMORE) => async (dispatch: Dispatch<any>, getState: any) => {
  const {
    listPageReducer: {
      pageInfo: { pageState },
      listInfo: {
        hasMore, loading
      }
    }
  } = getState() as IRootReducer;
  if (loading || (action !== LOAD_ACTION_ENUM.REFRESH && (pageState === PAGE_STATUS_ENUM.REFRESH || !hasMore))) {
    return;
  }
  dispatch({ type: action === LOAD_ACTION_ENUM.REFRESH ? REFRESH_LIST_REQUEST : LOAD_LIST_REQUEST });
  try {
    const { listPageReducer: { listInfo: { pageNum, pageSize } } } = getState() as IRootReducer;
    const data = await loadListApi({ _page: pageNum, _limit: pageSize });
    dispatch({
      type: action === LOAD_ACTION_ENUM.REFRESH ? REFRESH_LIST_SUCCESS : LOAD_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    if (action === LOAD_ACTION_ENUM.LOADMORE) {
      handleRequestError({
        error, page: PAGE_NAME, logTitle: 'load list action error', showMessage: false
      });
    } else {
      throw error;
    }
  }
};

export const initAction = () => async (dispatch: Dispatch<any>, getState: any) => {
  const {
    listPageReducer: {
      pageInfo: { pageState }
    }
  } = getState() as IRootReducer;
  if (pageState === PAGE_STATUS_ENUM.CONTENT) { // keep-alive
    return;
  }
  dispatch(setPageStateAction({ pageState: PAGE_STATUS_ENUM.LOADING }));
  try {
    await dispatch(loadListAction(LOAD_ACTION_ENUM.RESET));
    dispatch(setPageStateAction({ pageState: PAGE_STATUS_ENUM.CONTENT }));
  } catch (error) {
    dispatch(setPageStateAction({ pageState: PAGE_STATUS_ENUM.ERROR }));
    handleRequestError({ error, page: PAGE_NAME, logTitle: 'init action error' });
  }
};

export const refreshAction = () => async (dispatch: Dispatch<any>) => {
  dispatch(setPageStateAction({ pageState: PAGE_STATUS_ENUM.REFRESH }));
  try {
    await dispatch(loadListAction(LOAD_ACTION_ENUM.REFRESH));
  } catch (error) {
    handleRequestError({ error, page: PAGE_NAME, logTitle: 'refresh action error' });
  } finally {
    dispatch(setPageStateAction({ pageState: PAGE_STATUS_ENUM.CONTENT }));
  }
};
