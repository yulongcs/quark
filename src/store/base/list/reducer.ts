import { produce } from 'immer';
import { AnyAction } from 'redux';
import { SectionStateEnum } from '@vdfor/util';
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
} from './constant';
import { IQuxListState } from './type';

const INITIAL_STATE: IQuxListState = {
  pageNum: 1,
  pageSize: 15,
  hasMore: true,
  loadMoreLoading: false,
  refreshLoading: false,
  status: SectionStateEnum.CONTENT,
  data: [],
};

export default (pageName: string) => (state: IQuxListState = INITIAL_STATE, action: AnyAction) =>
  produce(state, draft => {
    const { type, payload = [], isPagination, pagination = {} } = action;
    switch (type) {
      case `${pageName}${RESET_LIST_REQUEST}`:
        Object.assign(draft, {
          ...INITIAL_STATE,
          status: SectionStateEnum.LOADING,
        });
        break;
      case `${pageName}${RESET_LIST_SUCCESS}`: {
        const { data, pageSize, pageNum } = state;
        const newData = [...data, ...payload];
        const hasMore = isPagination ? payload.length >= pageSize : false;
        Object.assign(draft, {
          data: newData,
          status: !hasMore && newData.length === 0 ? SectionStateEnum.EMPTY : SectionStateEnum.CONTENT,
          hasMore,
          pageNum: pageNum + 1,
        });
        break;
      }
      case `${pageName}${RESET_LIST_FAIL}`:
        Object.assign(draft, {
          // ...pagination,
          status: SectionStateEnum.ERROR,
        });
        break;
      case `${pageName}${LOAD_MORE_LIST_REQUEST}`:
        Object.assign(draft, { loadMoreLoading: true });
        break;
      case `${pageName}${LOAD_MORE_LIST_SUCCESS}`: {
        const { data, pageSize, pageNum } = state;
        Object.assign(draft, {
          data: [...data, ...payload],
          loadMoreLoading: false,
          hasMore: payload.length >= pageSize,
          pageNum: pageNum + 1,
        });
        break;
      }
      case `${pageName}${LOAD_MORE_LIST_FAIL}`:
        Object.assign(draft, {
          ...pagination,
          loadMoreLoading: false,
        });
        break;
      case `${pageName}${REFRESH_LIST_REQUEST}`:
        Object.assign(draft, {
          refreshLoading: true,
          pageNum: 1,
          hasMore: true,
        });
        break;
      case `${pageName}${REFRESH_LIST_SUCCESS}`: {
        const { pageSize, pageNum } = state;
        const newData = [...payload];
        const hasMore = isPagination ? payload.length >= pageSize : false;
        Object.assign(draft, {
          data: newData,
          status: !hasMore && newData.length === 0 ? SectionStateEnum.EMPTY : SectionStateEnum.CONTENT,
          hasMore,
          pageNum: pageNum + 1,
          refreshLoading: false,
        });
        break;
      }
      case `${pageName}${REFRESH_LIST_FAIL}`:
        Object.assign(draft, {
          ...pagination,
          refreshLoading: false,
          status: SectionStateEnum.CONTENT,
        });
        break;
      default:
        Object.assign(draft, {});
    }
  });
