import { Dispatch } from 'redux';
import { SectionStateEnum } from '@vdfor/util';
import { SET_SECTION_STATE } from './constants';

export const getQuxUIStateSetStatusAction = (sectionName: string) => (
  payload: SectionStateEnum
) => (dispatch: Dispatch<any>) => {
  dispatch({ type: `${sectionName}${SET_SECTION_STATE}`, payload });
};
