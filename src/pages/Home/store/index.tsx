import { HomeState } from './state';
import { HomeAction } from './action';

export const states = {
  home: new HomeState()
};

export const actions = {
  home: new HomeAction(states)
};
