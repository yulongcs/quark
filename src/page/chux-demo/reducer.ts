import { CHANGE_VALUE } from './constant';

export const INITIAL_STATE = { value: 12 };

export const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case CHANGE_VALUE:
      return { ...state, value: state.value + 1 };
    default:
      return state;
  }
};
