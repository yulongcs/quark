import { Dispatch } from 'redux';
import { SectionStateEnum, LoadActionEnum } from '@vdfor/util';
import { getQuxUIStateSetStatusAction } from '@/quxs';
import { getQuxListAction } from '@/quxs/env-h5';
import { loadListApi } from './api';
import { PAGE_NAME, PAGE_REDUCER_NAME, LOAD_LIST_REQUEST_TASK_KEY } from './constants';

const setUIStateAction = getQuxUIStateSetStatusAction(PAGE_NAME);

const getLoadListAction = (status = '') => getQuxListAction({
  pageName: PAGE_NAME,
  pageReducerName: PAGE_REDUCER_NAME,
  listAlias: 'listState',
  isPagination: true,
  loadRestDataFunc: async ({ pageSize, pageNum }) => {
    const result = await loadListApi({ pageNum, pageSize, status }, LOAD_LIST_REQUEST_TASK_KEY);
    return result;
  },
});

export const loadListAction = (loadAction: LoadActionEnum, status = '') => async (dispatch: Dispatch<any>) => {
  const selfLoadListAction = getLoadListAction(status);
  await dispatch(selfLoadListAction(loadAction));
};

export const initAction = () => async (dispatch: Dispatch<any>) => {
  dispatch(setUIStateAction(SectionStateEnum.LOADING));
  try {
    await dispatch(loadListAction(LoadActionEnum.RESET));
    dispatch(setUIStateAction(SectionStateEnum.CONTENT));
  } catch (error) {
    dispatch(setUIStateAction(SectionStateEnum.ERROR));
  }
};
