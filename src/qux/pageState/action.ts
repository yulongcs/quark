import { Dispatch } from 'redux';
import { IActionTypes } from './type';
import { IQuxPageInfoProps } from '../../type';

export default ({ SET_PAGE_STATE }: IActionTypes) => (payload: Partial<IQuxPageInfoProps> = {}) => (dispatch: Dispatch<any>) => {
  dispatch({ type: SET_PAGE_STATE, payload });
};
