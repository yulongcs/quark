import { IAppState, APP_CONSTANT } from './app';
import { IListDemoState, LIST_DEMO_CONSTANT } from './list-demo';

export interface IRootReducer {
  [APP_CONSTANT.ID]: IAppState;
  [LIST_DEMO_CONSTANT.ID]: IListDemoState;
}

export type GetStateFunc = () => IRootReducer;
