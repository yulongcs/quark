import { Dispatch } from 'redux';
import { SectionStateEnum, LoadActionEnum } from '@vdfor/util';
import { getQuxListAction } from '../base';
import { appAction } from '../app';
import { loadListApi } from './api';
import { ID, LOAD_LIST_REQUEST_TASK_KEY } from './constant';

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
  await dispatch(selfLoadListAction(loadAction));
};

export const init = () => async (dispatch: Dispatch<any>) => {
  dispatch(appAction.setAppRouteState({ uiStatus: SectionStateEnum.LOADING }));
  try {
    await dispatch(loadList(LoadActionEnum.RESET));
    dispatch(appAction.setAppRouteState({ uiStatus: SectionStateEnum.CONTENT }));
  } catch (error) {
    dispatch(appAction.setAppRouteState({ uiStatus: SectionStateEnum.ERROR }));
  }
};
