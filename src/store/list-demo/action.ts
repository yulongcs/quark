import { Dispatch, AnyAction } from 'redux';
import { SectionStateEnum, LoadActionEnum } from '@vdfor/util';
import { getQuxUIStateSetStatusAction, getQuxListAction } from '../base';
import { loadListApi } from './api';
import { ID, LOAD_LIST_REQUEST_TASK_KEY } from './constant';
import { appAction } from '..';

const setUIStateAction = getQuxUIStateSetStatusAction(ID);

const getLoadListAction = (status = '') =>
  getQuxListAction({
    pageName: ID,
    pageReducerName: ID,
    listAlias: 'listState',
    isPagination: true,
    loadRestDataFunc: async ({ pageSize, pageNum }) => {
      const result = await loadListApi({ pageNum, pageSize, status }, LOAD_LIST_REQUEST_TASK_KEY);
      return result;
    },
  });

export const loadList = (loadAction: LoadActionEnum, status = '') => async (
  dispatch: Dispatch<any>,
) => {
  const selfLoadListAction = getLoadListAction(status);
  dispatch(appAction.setAppMetaState({ route: '/list' }));
  await dispatch(selfLoadListAction(loadAction));
};

export const init = () => async (dispatch: Dispatch<any>) => {
  dispatch(setUIStateAction(SectionStateEnum.LOADING));
  try {
    await dispatch(loadList(LoadActionEnum.RESET));
    dispatch(setUIStateAction(SectionStateEnum.CONTENT));
  } catch (error) {
    dispatch(setUIStateAction(SectionStateEnum.ERROR));
  }
};
