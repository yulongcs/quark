import { Dispatch } from 'redux';
import { IListItemData } from './type';
import { IRootReducer } from '../../App/type';
import { getSetQuxPageStateAction, getQuxLoadListAction } from '../../../quxs';
import { LOAD_ACTION_ENUM, PAGE_STATUS_ENUM, IQuxPaginationBasicProps } from '../../../types';
import {
  PAGE_NAME, LOAD_LOG_REPORT_PAGE_LIST_SUCCESS, LOAD_LOG_REPORT_PAGE_LIST_REQUEST, SET_LOG_REPORT_PAGE_PAGE_STATE, REFRESH_LOG_REPORT_PAGE_LIST_REQUEST, REFRESH_LOG_REPORT_PAGE_LIST_SUCCESS
} from './constant';
import { handleRequestError, getFromLogCollection } from '../../../utils';

interface ILoadListApiParams extends IQuxPaginationBasicProps {
  listData: IListItemData[];
}

// 从本地数据库获取分页数据
const loadListApi = async ({ pageSize, listData }: ILoadListApiParams) => {
  const len = listData.length;
  const lastKey = (listData[len - 1] && listData[len - 1].key) || 0;
  const r = await getFromLogCollection({ range: lastKey > 0 ? IDBKeyRange.upperBound(lastKey, true) : IDBKeyRange.lowerBound(lastKey), limit: pageSize });
  return r;
};

export const setPageStateAction = getSetQuxPageStateAction({ SET_PAGE_STATE: SET_LOG_REPORT_PAGE_PAGE_STATE });

export const loadListAction = getQuxLoadListAction({
  pageReducerName: 'logReportPageReducer',
  LOAD_LIST_REQUEST: LOAD_LOG_REPORT_PAGE_LIST_REQUEST,
  LOAD_LIST_SUCCESS: LOAD_LOG_REPORT_PAGE_LIST_SUCCESS,
  REFRESH_LIST_REQUEST: REFRESH_LOG_REPORT_PAGE_LIST_REQUEST,
  REFRESH_LIST_SUCCESS: REFRESH_LOG_REPORT_PAGE_LIST_SUCCESS,
  pageName: PAGE_NAME,
  loadListApi
});

export const initAction = () => async (dispatch: Dispatch<any>, getState: any) => {
  const {
    logReportPageReducer: {
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
