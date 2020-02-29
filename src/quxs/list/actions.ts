import { Dispatch } from 'redux';
import { SectionStateEnum, LoadActionEnum } from '@vdfor/util';
import { IRootReducer } from '@/types';
import { cancelHttpCode } from '@/constants';
import {
  REFRESH_LIST_FAIL,
  REFRESH_LIST_REQUEST,
  REFRESH_LIST_SUCCESS,
  RESET_LIST_FAIL,
  RESET_LIST_REQUEST,
  RESET_LIST_SUCCESS,
  LOAD_MORE_LIST_SUCCESS,
  LOAD_MORE_LIST_REQUEST,
  LOAD_MORE_LIST_FAIL,
} from './constants';
import { IQuxListState } from './types';

interface IParams {
  pageName: string;
  pageReducerName: string;
  listAlias: string;
  isPagination: boolean; // 是否分页
  loadRestDataFunc: (params: { pageSize: number; pageNum: number }) => Promise<any[]>;
}

interface IActionParams {
  type: string;
  payload?: any[];
  isPagination?: boolean;
  pagination?: {
    hasMore: boolean;
    pageNum: number;
  };
}

export const getQuxListAction = ({
  pageName, pageReducerName, listAlias = 'list', loadRestDataFunc, isPagination = true,
}: IParams) => (loadAction: LoadActionEnum) => async (dispatch: Dispatch<IActionParams>, getState: any) => {
  const state = getState() as IRootReducer;
  if (!(state[pageReducerName] && state[pageReducerName][listAlias])) {
    return;
  }

  const {
    status, hasMore, pageNum: initPageNum, loadMoreLoading, refreshLoading,
  } = state[pageReducerName][listAlias] as IQuxListState;

  if (!hasMore && loadAction === LoadActionEnum.LOADMORE) {
    return;
  }

  if (loadAction !== LoadActionEnum.RESET) { // reset any
    if (loadMoreLoading || refreshLoading || status === SectionStateEnum.LOADING) {
      if (loadAction !== LoadActionEnum.LOADMORE) {
        // showDurationLoading('正在加载中...');
      }
      return;
    }
  }

  const selfCachePagination = { // 缓存pageNum/hasMore - 用于加载失败时恢复
    pageNum: initPageNum,
    hasMore,
  };

  switch (loadAction) { // request
    case LoadActionEnum.RESET:
      dispatch({ type: `${pageName}${RESET_LIST_REQUEST}` });
      break;
    case LoadActionEnum.REFRESH:
      dispatch({ type: `${pageName}${REFRESH_LIST_REQUEST}` });
      break;
    default: // loadMore
      dispatch({ type: `${pageName}${LOAD_MORE_LIST_REQUEST}` });
  }

  try {
    const { pageSize, pageNum } = (getState() as IRootReducer)[pageReducerName][listAlias] as IQuxListState;
    const payload = await loadRestDataFunc({ pageSize, pageNum });
    switch (loadAction) { // success
      case LoadActionEnum.RESET:
        dispatch({ type: `${pageName}${RESET_LIST_SUCCESS}`, payload, isPagination });
        break;
      case LoadActionEnum.REFRESH:
        dispatch({ type: `${pageName}${REFRESH_LIST_SUCCESS}`, payload, isPagination });
        break;
      default: // loadMore
        dispatch({ type: `${pageName}${LOAD_MORE_LIST_SUCCESS}`, payload });
    }
  } catch (error) {
    if (error && error.status === cancelHttpCode) { // error from request abort
      return;
    }
    switch (loadAction) { // fail
      case LoadActionEnum.RESET:
        dispatch({ type: `${pageName}${RESET_LIST_FAIL}` });
        // dispatch({ type: `${pageName}${RESET_LIST_FAIL}`, pagination: selfCachePagination });
        break;
      case LoadActionEnum.REFRESH:
        dispatch({ type: `${pageName}${REFRESH_LIST_FAIL}`, pagination: selfCachePagination });
        break;
      default: // loadMore
        dispatch({ type: `${pageName}${LOAD_MORE_LIST_FAIL}`, pagination: selfCachePagination });
    }
  }
};
