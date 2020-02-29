import { produce } from 'immer';
import { AnyAction } from 'redux';
import { SectionStateEnum } from '@vdfor/util';
import { SET_SECTION_STATE } from './constants';
import { IQuxUIState } from './types';

const INITIAL_STATE = {
  status: SectionStateEnum.LOADING
};

export default (sectionName: string) => (state: IQuxUIState = INITIAL_STATE, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case `${sectionName}${SET_SECTION_STATE}`:
        Object.assign(draft, { status: action.payload });
        break;
      default:
        Object.assign(draft, {});
    }
  });
