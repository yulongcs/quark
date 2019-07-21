import { Dispatch } from 'redux';
import { loadListApi } from './api';
import { IRootReducer } from '../app';
import { getSetQuxPageStateAction, getQuxLoadListAction, resetQuxListAction } from '../../qux';
import { LOAD_ACTION_ENUM, PAGE_STATUS_ENUM } from '../../type';
import {
  PAGE_NAME, LOAD_LIST_PAGE_LIST_SUCCESS, LOAD_LIST_PAGE_LIST_REQUEST, SET_LIST_PAGE_PAGE_STATE, REFRESH_LIST_PAGE_LIST_REQUEST, REFRESH_LIST_PAGE_LIST_SUCCESS, RESET_LIST_PAGE_LIST
} from './constant';
import { handleRequestError } from '../../util';

export const setPageStateAction = getSetQuxPageStateAction({ SET_PAGE_STATE: SET_LIST_PAGE_PAGE_STATE });

export const resetListAction = resetQuxListAction({
  pageReducerName: 'listPageReducer',
  RESET_LIST: RESET_LIST_PAGE_LIST
});

export const loadListAction = getQuxLoadListAction({
  pageReducerName: 'listPageReducer',
  LOAD_LIST_REQUEST: LOAD_LIST_PAGE_LIST_REQUEST,
  LOAD_LIST_SUCCESS: LOAD_LIST_PAGE_LIST_SUCCESS,
  REFRESH_LIST_REQUEST: REFRESH_LIST_PAGE_LIST_REQUEST,
  REFRESH_LIST_SUCCESS: REFRESH_LIST_PAGE_LIST_SUCCESS,
  pageName: PAGE_NAME,
  loadListApi,
  pageNumMap: '_page',
  pageSizeMap: '_limit'
});

export const initAction = () => async (dispatch: Dispatch<any>, getState: any) => {
  const {
    listPageReducer: {
      pageInfo: { pageState }
    }
  } = getState() as IRootReducer;
  if (pageState === PAGE_STATUS_ENUM.CONTENT) { // keep-alive
    return;
  }
  dispatch(resetListAction());
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
