import { Dispatch } from 'redux';
import { IActionTypes } from './type';
import { LOAD_ACTION_ENUM } from '../../type';
import { handleRequestError } from '../../util';
import { PAGE_NAME as LOG_REPORT_PAGE_NAME } from '../../page/report/log-report/constant';

interface IResetListParams {
  pageReducerName: string;
  RESET_LIST: string;
}

interface ILoadListParams extends IActionTypes {
  pageReducerName: string;
  loadListApi: (opts: any) => Promise<any>;
  loadListApiExtraParams?: Record<string, any>;
  pageName: string;
  pageSizeMap?: string;
  pageNumMap?: string;
}

export const resetQuxListAction = ({
  pageReducerName,
  RESET_LIST
}: IResetListParams) => () => async (dispatch: Dispatch<any>, getState: any) => {
  const state = getState();
  if (!(state[pageReducerName] && state[pageReducerName].listInfo)) {
    return;
  }
  dispatch({ type: RESET_LIST });
};

export const getQuxLoadListAction = ({
  pageReducerName,
  loadListApi,
  LOAD_LIST_REQUEST,
  LOAD_LIST_SUCCESS,
  REFRESH_LIST_REQUEST,
  REFRESH_LIST_SUCCESS,
  pageName,
  loadListApiExtraParams = {},
  pageSizeMap = 'pageSize',
  pageNumMap = 'pageNum'
}: ILoadListParams) => (action: LOAD_ACTION_ENUM = LOAD_ACTION_ENUM.LOADMORE) => async (dispatch: Dispatch<any>, getState: any) => {
  const state = getState();
  if (!(state[pageReducerName] && state[pageReducerName].listInfo)) {
    return;
  }
  const { loading, hasMore, refreshing } = state[pageReducerName].listInfo;
  if (loading || refreshing || (!hasMore && action !== LOAD_ACTION_ENUM.REFRESH)) {
    return;
  }
  dispatch({ type: action === LOAD_ACTION_ENUM.REFRESH ? REFRESH_LIST_REQUEST : LOAD_LIST_REQUEST });
  try {
    const newState = getState();
    const { pageNum, pageSize, data: listData } = newState[pageReducerName].listInfo;
    const data = await loadListApi({
      ...loadListApiExtraParams,
      ...{ [pageNumMap]: pageNum, [pageSizeMap]: pageSize },
      ...(pageName === LOG_REPORT_PAGE_NAME ? { listData: action === LOAD_ACTION_ENUM.REFRESH ? [] : listData } : {}) // logReportPage的list数据从本地数据库获取，此处进行特殊处理
    });
    dispatch({
      type: action === LOAD_ACTION_ENUM.REFRESH ? REFRESH_LIST_SUCCESS : LOAD_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    if (action === LOAD_ACTION_ENUM.LOADMORE) {
      handleRequestError({
        error, page: pageName, logTitle: 'load list action error', showMessage: false
      });
    } else {
      throw error;
    }
  }
};
