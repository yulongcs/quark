import { AnyAction, combineReducers } from 'redux';
import {
  LOAD_LIST_REQUEST,
  LOAD_LIST_SUCCESS,
  LOAD_LIST_FAIL,
  REFRESH_LIST_REQUEST,
  REFRESH_LIST_SUCCESS,
  SET_PAGE_STATE
} from './constant';
import { PAGE_STATUS_ENUM } from '../../types';
import { IListProps, IPageInfoProps } from './type';

const INITIAL_PAGE_STATE = {
  pageState: PAGE_STATUS_ENUM.LOADING,
  scrollTop: 0
};

const INITIAL_LIST_STATE = {
  data: [],
  loading: false,
  pageSize: 8,
  pageNum: 1,
  hasMore: true
};

const pageReducer = (state: IPageInfoProps = INITIAL_PAGE_STATE, action: AnyAction) => {
  switch (action.type) {
    case SET_PAGE_STATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

const loadListReducer = (state: IListProps = INITIAL_LIST_STATE, action: AnyAction) => {
  switch (action.type) {
    case LOAD_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOAD_LIST_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
        pageNum: state.pageNum + 1,
        loading: false,
        hasMore: action.payload.length >= state.pageSize
      };
    case LOAD_LIST_FAIL:
      return {
        ...state,
        loading: false
      };
    case REFRESH_LIST_REQUEST:
      return {
        ...state,
        pageNum: 1
      };
    case REFRESH_LIST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        pageNum: state.pageNum + 1,
        hasMore: action.payload.length >= state.pageSize
      };
    default:
      return state;
  }
};

export default combineReducers({
  pageInfo: pageReducer,
  listInfo: loadListReducer
});
