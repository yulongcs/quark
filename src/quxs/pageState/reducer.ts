import { AnyAction } from 'redux';
import { IActionTypes } from './type';
import { PAGE_STATUS_ENUM, IQuxPageInfoProps } from '../../types';

const INITIAL_PAGE_STATE = {
  pageState: PAGE_STATUS_ENUM.LOADING,
  scrollTop: 0
};

export default ({ SET_PAGE_STATE }: IActionTypes) => (state: IQuxPageInfoProps = INITIAL_PAGE_STATE, action: AnyAction) => {
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
