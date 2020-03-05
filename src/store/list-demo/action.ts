import { Dispatch } from 'redux';
import { LoadActionEnum } from '@vdfor/util';
import { loadListApi } from './api';
import { ID, LOAD_LIST_REQUEST_TASK_KEY } from './constant';
import { appAction, getQuxListAction, GetStateFunc, APP_CONSTANT } from '..';

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

export const init = () => async (dispatch: Dispatch<any>, getState: GetStateFunc) => {
  const {
    [APP_CONSTANT.ID]: {
      routeState: { id: routeId },
    },
  } = getState();
  dispatch(appAction.showLoading(routeId));
  try {
    await dispatch(loadList(LoadActionEnum.RESET));
    dispatch(appAction.showContent(routeId));
  } catch (error) {
    dispatch(appAction.showError(routeId));
  }
};
