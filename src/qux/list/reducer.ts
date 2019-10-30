import { AnyAction } from 'redux';
import { IReducerTypes } from './type';
import { IQuxListProps } from '../../type';

const INITIAL_LIST_STATE = {
  data: [],
  loading: false,
  refreshing: false,
  pageSize: 12,
  pageNum: 1,
  hasMore: true,
};

export default ({
  RESET_LIST, LOAD_LIST_REQUEST, LOAD_LIST_SUCCESS, LOAD_LIST_FAIL, REFRESH_LIST_REQUEST, REFRESH_LIST_SUCCESS,
}: IReducerTypes) => (state: IQuxListProps = INITIAL_LIST_STATE, action: AnyAction) => {
  switch (action.type) {
    case RESET_LIST:
      return {
        ...state,
        ...INITIAL_LIST_STATE,
      };
    case LOAD_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_LIST_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
        pageNum: state.pageNum + 1,
        loading: false,
        refreshing: false,
        hasMore: action.payload.length >= state.pageSize,
      };
    case LOAD_LIST_FAIL:
      return {
        ...state,
        loading: false,
      };
    case REFRESH_LIST_REQUEST:
      return {
        ...state,
        refreshing: true,
        pageNum: 1,
      };
    case REFRESH_LIST_SUCCESS:
      return {
        ...state,
        refreshing: false,
        data: action.payload,
        pageNum: state.pageNum + 1,
        hasMore: action.payload.length >= state.pageSize,
      };
    default:
      return state;
  }
};
