import { Dispatch } from 'redux';
import { IActionTypes } from './type';
import { LOAD_ACTION_ENUM } from '../../types';
import { handleRequestError } from '../../utils';

interface IParams extends IActionTypes {
  pageReducerName: string;
  loadListApi: (opts: any) => Promise<any>;
  loadListApiExtraParams?: Record<string, any>;
  pageName: string;
  pageSizeMap?: string;
  pageNumMap?: string;
}

export default ({
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
}: IParams) => (action: LOAD_ACTION_ENUM = LOAD_ACTION_ENUM.LOADMORE) => async (dispatch: Dispatch<any>, getState: any) => {
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
    const { pageNum, pageSize } = newState[pageReducerName].listInfo;
    const data = await loadListApi({ ...loadListApiExtraParams, ...{ [pageNumMap]: pageNum, [pageSizeMap]: pageSize } });
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
