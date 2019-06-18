import { AnyAction, combineReducers } from 'redux';
import { LOAD_DATA_REQUEST } from './constant';
import { PAGE_STATUS_ENUM } from '../../types';

const INITIAL_PAGE_INFO_STATE = {
  pageState: PAGE_STATUS_ENUM.LOADING
};

const pageInfo = (state = INITIAL_PAGE_INFO_STATE, action: AnyAction) => {
  switch (action.type) {
    case LOAD_DATA_REQUEST:
      return {
        ...state,
        pageState: PAGE_STATUS_ENUM.LOADING
      };
    default:
      return state;
  }
};

export default combineReducers({
  pageInfo
});
