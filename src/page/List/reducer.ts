import { AnyAction, combineReducers } from 'redux';
import {
  LOAD_PAGE_REQUEST,
  LOAD_PAGE_SUCCESS,
  LOAD_PAGE_FAIL,
  LOAD_LIST_REQUEST,
  LOAD_LIST_SUCCESS,
  LOAD_LIST_FAIL
} from './constant';
import { PAGE_STATUS_ENUM } from '../../types';
import { IListProps, IPageInfoProps } from './type';

const INITIAL_PAGE_STATE = {
  pageState: PAGE_STATUS_ENUM.LOADING
};

const INITIAL_LIST_STATE = {
  data: [],
  loading: false,
  pageSize: 8,
  pageNum: 1
};

const pageReducer = (state: IPageInfoProps = INITIAL_PAGE_STATE, action: AnyAction) => {
  switch (action.type) {
    case LOAD_PAGE_REQUEST:
      return {
        ...state,
        pageState: PAGE_STATUS_ENUM.LOADING
      };
    case LOAD_PAGE_SUCCESS:
      return {
        ...state,
        pageState: PAGE_STATUS_ENUM.CONTENT
      };
    case LOAD_PAGE_FAIL:
      return {
        ...state,
        pageState: PAGE_STATUS_ENUM.ERROR
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
        loading: false
      };
    case LOAD_LIST_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default combineReducers({
  pageInfo: pageReducer,
  listInfo: loadListReducer
});
